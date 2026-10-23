import { useContext, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Droplist } from '@snack-uikit/list';

import { Input } from '../../../components';
import { SiteFormContext } from '../../../context';
import { FormField } from '../../../types';
import { createFieldFillBlurHandler } from '../utils/createFieldFillBlurHandler';
import { getItemsDropList } from './utils/getItemsDropList';
import { getValidationInputType } from './utils/getValidationInputType';
import { suggestionToDropListItem } from './utils/suggestionToDropListItem';
import { DropListItemSpark, FieldTypeInnCompany } from './utils/types';

type SparkFieldProps = Pick<FormField, 'required'> & {
  className?: string;
  classNameInput?: string;
  disabled?: boolean;
  label: string;
  type: FieldTypeInnCompany;
  additionalType: FieldTypeInnCompany;
  onFieldFill(name: string): void;
};

const formatCompany = (company: string) => {
  const parts = company.split(', ');

  if (parts.length < 2) {
    return company;
  }

  return `${parts.pop()} ${parts.join(', ')}`;
};

export function SparkField(props: SparkFieldProps) {
  const { className, classNameInput, label, type, additionalType, required = false, disabled, onFieldFill } = props;
  const [selectedId, setSelectedId] = useState<string>();
  const [query, setQuery] = useState('');
  const [sparkLoading, setSparkLoading] = useState(false);
  const [items, setItems] = useState<Array<DropListItemSpark>>();

  const { setValue, getValues } = useFormContext();
  const inputValue = useWatch<Record<string, string>>({ name: type, defaultValue: '' });
  const { getCompanySuggestions, onControlClick } = useContext(SiteFormContext);

  useEffect(() => {
    setItems(undefined);

    if (!query || query !== inputValue || !getCompanySuggestions || disabled || selectedId) {
      setSparkLoading(false);
      return;
    }

    let active = true;
    setSparkLoading(true);

    const fetchSuggestions = async () => {
      try {
        const suggestions = await getCompanySuggestions(query);

        if (active) {
          setItems(suggestions.map(suggestionToDropListItem));
        }
      } catch {
        if (active) {
          setItems([]);
        }
      } finally {
        if (active) {
          setSparkLoading(false);
        }
      }
    };

    const timer = setTimeout(fetchSuggestions, 500);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, inputValue, getCompanySuggestions, disabled, selectedId]);

  const handleChangeInputInn = (value: string) => {
    setSelectedId(undefined);
    setQuery(value);
  };

  const onSelect = (itemId: string) => {
    const item = items?.find(item => item.id === itemId);

    if (!item || disabled) {
      return;
    }

    setSelectedId(itemId);
    setQuery('');
    onControlClick?.({ content: item.company, id: `spark-drop-list-item-${itemId}` });
    setValue(type, type === 'company' ? formatCompany(item.company) : item.inn, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (Object.hasOwn(getValues(), additionalType)) {
      setValue(additionalType, additionalType === 'company' ? formatCompany(item.company) : item.inn, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleBlur = createFieldFillBlurHandler(onFieldFill, label);

  const input = (
    <Input
      {...getValidationInputType(type)}
      className={classNameInput}
      name={type}
      label={label}
      onChange={getCompanySuggestions ? handleChangeInputInn : undefined}
      required={required}
      disabled={disabled}
      data-qa='section_input'
      onBlur={handleBlur}
    />
  );

  if (!getCompanySuggestions) {
    return <div className={className}>{input}</div>;
  }

  return (
    <div className={className}>
      <Droplist
        widthStrategy='eq'
        selection={{
          value: selectedId,
          onChange: onSelect,
          mode: 'single',
        }}
        scroll={true}
        loading={sparkLoading}
        trigger='focus'
        items={getItemsDropList(sparkLoading, items)}
        closeDroplistOnItemClick
      >
        {input}
      </Droplist>
    </div>
  );
}
