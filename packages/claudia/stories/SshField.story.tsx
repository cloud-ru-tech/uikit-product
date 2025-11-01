import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useEffect, useState } from 'react';

import { MobileDrawerCustom } from '@sbercloud/uikit-product-mobile-drawer';
import { ButtonFilled } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { Typography } from '@snack-uikit/typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SshField, SshFieldProps } from '../src';
import { isTouchDevice } from '../src/components/SshField/utils/isTouchDevice';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Claudia/SshField',
  component: SshField,
};
export default meta;

type StoryProps = SshFieldProps;

const onSubmit = (value: string) => window.alert(`Submitted: ${value}`);

const Template = ({ value: valueProp, ...args }: StoryProps) => {
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
              <SshField {...args} value={value} onChange={setValue} onSubmit={onSubmit} />
            </div>
          </div>
        </MobileDrawerCustom>
        <Typography.SansBodyM>{value}</Typography.SansBodyM>
      </>
    );
  }

  return (
    <div
      className={cn(styles.wrapper, styles.sshFieldWrapper, {
        [styles.mobileWrapper]: isTouchDevice(args.layoutType),
      })}
    >
      <SshField {...args} value={value} onChange={setValue} onSubmit={onSubmit} />
      {value && (
        <div className={styles.sshTextWrapper}>
          <Typography.SansBodyM>{value}</Typography.SansBodyM>
        </div>
      )}
    </div>
  );
};

export const sshField: StoryObj<StoryProps> = {
  render: function Render({ ...props }) {
    const [args, setArgs] = useArgs<StoryProps>();

    const onChange = (value: string) => {
      setArgs({ value });
    };

    return <Template {...props} onChange={onChange} value={args.value} />;
  },
  args: {},
  argTypes: {},
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
