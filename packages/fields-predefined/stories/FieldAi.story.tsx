import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useEffect, useState } from 'react';

import { MobileDrawerCustom } from '@cloud-ru/uikit-product-mobile-drawer';
import { ButtonFilled } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldAi, FieldAiProps } from '../src';
import { isTouchDevice } from '../src/helpers';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Fields Predefined/Field AI',
  component: FieldAi,
};
export default meta;

type StoryProps = FieldAiProps & {
  showResetContextButton?: boolean;
  showAlert?: boolean;
};

const onSubmit = (value: string) => window.alert(`Submitted: ${value}`);
const handleResetContextClick = () => window.alert('Context has been reset successfully!');
const handleCancelSecure = () => window.alert('Secure mode has been cancelled');

const Template = ({ value: valueProp, showResetContextButton, showAlert, ...args }: StoryProps) => {
  const [value, setValue] = useState(valueProp);
  const [aiChatOpened, setAiChatOpened] = useState(false);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  if (isTouchDevice(args.layoutType)) {
    return (
      <>
        <ButtonFilled label='Open' onClick={() => setAiChatOpened(true)}></ButtonFilled>
        <MobileDrawerCustom
          open={aiChatOpened}
          onClose={() => setAiChatOpened(false)}
          size='100%'
          position='bottom'
          hasBorderRadius={true}
          swipeEnabled={true}
          closeButtonEnabled={false}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              boxSizing: 'border-box',
            }}
          >
            <Divider />

            <div
              style={{
                padding: '8px 16px',
                paddingRight: '6px',
              }}
            >
              <FieldAi
                {...args}
                value={value}
                onChange={setValue}
                onSubmit={onSubmit}
                onResetContextClick={showResetContextButton ? handleResetContextClick : undefined}
                onCancelSecure={showAlert && args.secure === 'password' ? handleCancelSecure : undefined}
              />
            </div>
          </div>
        </MobileDrawerCustom>
      </>
    );
  }

  return (
    <div
      className={cn(styles.wrapper, styles.fieldAiWrapper, {
        [styles.mobileWrapper]: isTouchDevice(args.layoutType),
      })}
    >
      <FieldAi
        {...args}
        value={value}
        onChange={setValue}
        onSubmit={onSubmit}
        onResetContextClick={showResetContextButton ? handleResetContextClick : undefined}
        onCancelSecure={showAlert && args.secure === 'password' ? handleCancelSecure : undefined}
      />
    </div>
  );
};

export const fieldAI: StoryObj<StoryProps> = {
  render: function Render({ ...props }) {
    const [args, setArgs] = useArgs<StoryProps>();

    const onChange = (value: string) => {
      setArgs({ value });
    };

    return <Template {...props} onChange={onChange} value={args.value} />;
  },
  args: {
    showResetContextButton: false,
    showAlert: false,
  },
  argTypes: {
    showResetContextButton: {
      name: '[Stories]: Enable reset context button',
    },
    showAlert: {
      name: '[Stories]: Show password alert',
      description: 'Shows alert when secure mode is set to "password"',
    },
    secure: {
      options: [false, true, 'password'],
      defaultValue: false,
      control: {
        type: 'radio',
      },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/a6IwGVpPwPCE1xQ3Vdq0fk/Product-UI-Kit?node-id=32386-22197&m=dev',
    },
  },
};
