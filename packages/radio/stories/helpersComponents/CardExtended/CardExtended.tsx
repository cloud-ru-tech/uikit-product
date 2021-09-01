import { CardHeader, Description, Label, Tag, Title, Wrapper } from './styled';

type CardProps = {
  title: string;
  label: string;
  description: string;
  disabled?: boolean;
  checked?: boolean;
  tag?: React.ReactNode;
};

export function CardExtended({ title, label, description, tag, disabled, checked }: CardProps) {
  return (
    <Wrapper data-disabled={disabled} data-checked={checked}>
      <CardHeader>
        {title && <Title>{title}</Title>}
        {tag && <Tag>{tag}</Tag>}
      </CardHeader>
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}
    </Wrapper>
  );
}
