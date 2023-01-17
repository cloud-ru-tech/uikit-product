# Cards

## Installation
`npm i @sbercloud/uikit-product-cards`

## Props

```ts
type CardBannerProps = WithSupportProps<{
  src: string;
  title: string;
  description: string;
  buttons: ButtonProps[];
  className?: string;
}>;

type CardCategoryProps = WithSupportProps<{
    icon: JSX.Element;
    title: string;
    description?: string;
    variant?: Variant;
    className?: string;
    onClick(): void;
}>;

// CardCategory variants
enum Variant {
    Filled = 'Filled',
    Outline = 'Outline',
}

type CardImageProps = WithSupportProps<{
    src: string;
    className?: string;
    title: string;
    description?: string;
    signature?: string;
    onClick(): void;
}>;

type CardQuickActionProps = WithSupportProps<{
    icon: JSX.Element;
    className?: string;
    title: string;
    description: string;
    variant: Variant;
    onClick(): void;
}>;

// CardQuickAction variants
enum Variant {
    Primary = 'Primary',
    Accent = 'Accent',
}

type CardResultProps = WithSupportProps<{
    title: string;
    description: string;
    className?: string;
    onClick(): void;
}>;

// CardResult variants
enum Variant {
    Filled = 'Filled',
    Outline = 'Outline',
}


type CardTopicProps = WithSupportProps<{
    icon: JSX.Element;
    title: string;
    color: Color;
    className?: string;
    onClick(): void;
}>;

// CardTopic colors
const ICON_COLOR_CLASS_NAME: Record<Color, LinariaClassName> = {
    [Color.Pink]: S.Pink,
    [Color.Orange]: S.Orange,
    [Color.Red]: S.Red,
    [Color.Violet]: S.Violet,
    [Color.Blue]: S.Blue,
    [Color.Brown]: S.Brown,
    [Color.Green]: S.Green,
    [Color.Yellow]: S.Yellow,
    [Color.SilverGrey]: S.SilverGrey,
    [Color.CharcoalGrey]: S.CharcoalGrey,
    [Color.Grass]: S.Grass,
    [Color.Seamount]: S.Seamount,
};

type CardWideProps = WithSupportProps<{
    title: string;
    titleImageSrc?: string;
    description: string;
    className?: string;
    buttons: ButtonProps[];
    imageSrc: string;
}>;

type CardProductProps = WithSupportProps<{
  icon: JSX.Element;
  title: string;
  description: string;
  className?: string;
  actions?: ReactNode;
  tag?:
    | {
        view: CardTag.Status;
        text: string;
        type: Types;
      }
    | {
        view: CardTag.Colored;
        text: string;
        color: Colors;
      };
}>;
```

[Changelog](./CHANGELOG.md)


