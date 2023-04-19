# Welcome Tour

## Installation

`npm i @sbercloud/uikit-product-welcome-tour`

[Changelog](./CHANGELOG.md)

Package for client onboarding tour guide on web-page

## Usage

If you want to hide Back button for WelcomeTour, do not pass the backButtonText prop.

```typescript jsx
    <div id='test-1'>
      Component to start the tour with
    </div>
    <div id='test-2'>
      Next step of the tour
    </div>
    <div id='test-3'>
      The last step in the tour
    </div>
    <WelcomeTour
      tourSteps={ArrayOfSteps}
      tourStarted={tourStartedState}
      setTourStarted={setTourStartedState}
      primaryButtonText='Primary button text'
      backButtonText='Back button text'
      closeButtonText='Last step button text'
    />
```

## Props

```typescript
type WelcomeTourProps = {
  tourSteps: StepWithSubtitle[];
  tourStarted: boolean;
  setTourStarted(value: boolean): void;
  closeButtonText: string;
  primaryButtonText: string;
  backButtonText: string;
};

type StepWithSubtitle = {
  subtitle?: ReactNode;
} & Omit<Step, 'disableBeacon'>;

interface Step extends CommonProps {
  content: React.ReactNode;
  event?: string;
  floaterProps?: FloaterType;
  hideFooter?: boolean;
  isFixed?: boolean;
  offset?: number;
  placement?: Placement | 'auto' | 'center';
  placementBeacon?: Placement;
  target: string | HTMLElement;
  title?: React.ReactNode;
}

interface CommonProps {
  beaconComponent?: React.ElementType<BeaconRenderProps>;
  disableCloseOnEsc?: boolean;
  disableOverlay?: boolean;
  disableOverlayClose?: boolean;
  disableScrolling?: boolean;
  disableScrollParentFix?: boolean;
  floaterProps?: FloaterType;
  hideBackButton?: boolean;
  hideCloseButton?: boolean;
  locale?: Locale;
  nonce?: string;
  showProgress?: boolean;
  showSkipButton?: boolean;
  spotlightClicks?: boolean;
  spotlightPadding?: number;
  styles?: Styles;
  tooltipComponent?: React.ElementType<TooltipRenderProps>;
}
```
