import { JSXElementConstructor } from 'react';

type InnerLink = {
  icon: JSXElementConstructor<{
    size?: number;
    className?: string;
  }>;
  label: string;
  onClick(): void;
};

export type LinksGroup = {
  id: string;
  label: string;
  items: InnerLink[];
};
