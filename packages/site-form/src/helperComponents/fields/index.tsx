import React from 'react';

import { FieldType } from '../../types';
import { Address } from './Address';
import { BirthDate } from './BirthDate';
import { Callback } from './Callback';
import { Comment } from './Comment';
import { Company } from './Company';
import { CompamyPositionInnOptional, CompanyPositionOptional } from './CompanyPositionOptional';
import { ConsentForExternalEvents } from './ConsentForExternalEvents';
import { Email } from './Email';
import { FieldProps } from './FieldProps';
import { Industry } from './Industry';
import { Inn } from './Inn';
import { Name } from './Name';
import { NaturalPerson } from './NaturalPerson';
import { Offence } from './Offence';
import { ParticipationFormat } from './ParticipationFormat';
import { Passport } from './Passport';
import { Phone } from './Phone';
import { Position } from './Position';
import { Telegram } from './Telegram';
import { TerritorialSubDivision } from './TerritorialSubDivision';

type FieldRegistryField = (props: FieldProps) => React.JSX.Element;

export const FieldsRegistry: Record<Exclude<FieldType, 'text'>, FieldRegistryField> = {
  comment: Comment,
  company: Company,
  companyPositionOptional: CompanyPositionOptional,
  compamyPositionInnOptional: CompamyPositionInnOptional,
  email: Email,
  firstName: Name,
  inn: Inn,
  lastName: props => <Name {...props} variant='lastName' />,
  name: Name,
  participationFormat: ParticipationFormat,
  phone: Phone,
  telegramLogin: Telegram,
  position: Position,
  consentForExternalEvents: ConsentForExternalEvents,
  middleName: props => <Name {...props} variant='middleName' />,
  passport: Passport,
  birthDate: BirthDate,
  address: Address,
  naturalPerson: NaturalPerson,
  callback: Callback,
  offence: Offence,
  territorialSubDivision: TerritorialSubDivision,
  industry: Industry,
};
