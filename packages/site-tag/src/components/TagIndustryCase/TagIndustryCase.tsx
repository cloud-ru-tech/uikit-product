import { ValueOf } from '@snack-uikit/utils';

import { TagSpecial, TagSpecialProps } from '../../helperComponents';
import { INDUSTRY_CASES_TYPE } from './constants';

export type TagIndustryCaseProps = {
  type: ValueOf<typeof INDUSTRY_CASES_TYPE>;
  size: TagSpecialProps['size'];
};

const getTagSpecialText = (type: TagIndustryCaseProps['type']): Pick<TagSpecialProps, 'text'>['text'] | null => {
  switch (type) {
    case INDUSTRY_CASES_TYPE.Popular:
      return 'Популярное';
    case INDUSTRY_CASES_TYPE.Secure:
      return 'Безопасность';
    case INDUSTRY_CASES_TYPE.Infrastructure:
      return 'Инфраструктура';
    case INDUSTRY_CASES_TYPE.Networks:
      return 'Сети';
    case INDUSTRY_CASES_TYPE.Storage:
      return 'Хранение и резервное копирование';
    case INDUSTRY_CASES_TYPE.OblakoVmware:
      return 'Облако VMware';
    case INDUSTRY_CASES_TYPE.MachineLearningAndMlSpace:
      return 'AI & ML';
    case INDUSTRY_CASES_TYPE.Containers:
      return 'Контейнеры';
    case INDUSTRY_CASES_TYPE.Database:
      return 'Базы данных';
    case INDUSTRY_CASES_TYPE.Migration:
      return 'Миграция';
    case INDUSTRY_CASES_TYPE.Development:
      return 'Разработка';
    case INDUSTRY_CASES_TYPE.Serverless:
      return 'Serverless';
    case INDUSTRY_CASES_TYPE.DataAnalytics:
      return 'Аналитика данных';
    case INDUSTRY_CASES_TYPE.ManagementAndAdministration:
      return 'Управление и администрирование';
    case INDUSTRY_CASES_TYPE.Services:
      return 'Услуги';
    case INDUSTRY_CASES_TYPE.DataPlatform:
      return 'Платформа данных';
    case INDUSTRY_CASES_TYPE.MlAiInstruments:
      return 'ML/AI Инструменты';
    case INDUSTRY_CASES_TYPE.Construction:
      return 'Строительство';
    case INDUSTRY_CASES_TYPE.Retail:
      return 'Торговля';
    case INDUSTRY_CASES_TYPE.Charity:
      return 'Благотворительность';
    case INDUSTRY_CASES_TYPE.AgroIndustry:
      return 'Агропромышленность';
    case INDUSTRY_CASES_TYPE.Finance:
      return 'Финансы';
    case INDUSTRY_CASES_TYPE.CaseServices:
      return 'Услуги';
    case INDUSTRY_CASES_TYPE.Education:
      return 'Образование';
    case INDUSTRY_CASES_TYPE.Goverment:
      return 'Государство';
    case INDUSTRY_CASES_TYPE.Media:
      return 'Медиа и реклама';
    case INDUSTRY_CASES_TYPE.Healthcare:
      return 'Здравоохранение';
    case INDUSTRY_CASES_TYPE.FoodIndustry:
      return 'Пищевая промышленность';
    case INDUSTRY_CASES_TYPE.ItDevelopment:
      return 'IT-разработка';
    case INDUSTRY_CASES_TYPE.EquipmentSuppliers:
      return 'Поставщики оборудования';
    case INDUSTRY_CASES_TYPE.Production:
      return 'Производство';
    case INDUSTRY_CASES_TYPE.Telecommunications:
      return 'Телекоммуникации';
    case INDUSTRY_CASES_TYPE.Insurance:
      return 'Страхование';
    case INDUSTRY_CASES_TYPE.ElectronicEquipment:
      return 'Электронная техника';
    case INDUSTRY_CASES_TYPE.Transport:
      return 'Транспорт и логистика';

    default:
      return null;
  }
};

export function TagIndustryCase({ type, size }: TagIndustryCaseProps) {
  const tagText = getTagSpecialText(type);

  return tagText && <TagSpecial size={size} appearance='neutral' text={tagText} />;
}
