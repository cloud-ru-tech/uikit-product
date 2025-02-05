import { ValueOf } from '@snack-uikit/utils';

import { TagPredefinedCommonProps, TagProps } from '../types';

export const INDUSTRY_CASE_TYPE = {
  Popular: 'popular',
  Secure: 'secure',
  Infrastructure: 'infrastructure',
  Networks: 'networks',
  Storage: 'storage',
  OblakoVmware: 'oblako-vmware',
  MachineLearningAndMlSpace: 'machine-learning-and-ml-space',
  Containers: 'containers',
  Database: 'database',
  Migration: 'migration',
  Development: 'development',
  Serverless: 'serverless',
  DataAnalytics: 'data-analytics',
  ManagementAndAdministration: 'management-and-administration',
  Services: 'services',
  DataPlatform: 'data-platform',
  MlAiInstruments: 'ml-ai-instruments',
  Construction: 'construction',
  Retail: 'retail',
  Charity: 'charity',
  AgroIndustry: 'agro-industry',
  Finance: 'finance',
  CaseServices: 'case-services',
  Education: 'education',
  Government: 'government',
  Media: 'media',
  Healthcare: 'healthcare',
  FoodIndustry: 'food-industry',
  ItDevelopment: 'it-development',
  EquipmentSuppliers: 'equipment-suppliers',
  Production: 'production',
  Telecommunications: 'telecommunications',
  Insurance: 'insurance',
  ElectronicEquipment: 'electronic-equipment',
  Transport: 'transport',
} as const;

export type TagIndustryCaseProps = TagPredefinedCommonProps & {
  type: ValueOf<typeof INDUSTRY_CASE_TYPE>;
  variant: 'industry';
};

export const getTagIndustryProps = (type: TagIndustryCaseProps['type']): TagProps => {
  switch (type) {
    case INDUSTRY_CASE_TYPE.Popular:
      return {
        text: 'Популярное',
      };
    case INDUSTRY_CASE_TYPE.Secure:
      return {
        text: 'Безопасность',
      };
    case INDUSTRY_CASE_TYPE.Infrastructure:
      return {
        text: 'Инфраструктура',
      };
    case INDUSTRY_CASE_TYPE.Networks:
      return {
        text: 'Сети',
      };
    case INDUSTRY_CASE_TYPE.Storage:
      return {
        text: 'Хранение и резервное копирование',
      };
    case INDUSTRY_CASE_TYPE.OblakoVmware:
      return {
        text: 'Облако VMware',
      };
    case INDUSTRY_CASE_TYPE.MachineLearningAndMlSpace:
      return {
        text: 'AI & ML',
      };
    case INDUSTRY_CASE_TYPE.Containers:
      return {
        text: 'Контейнеры',
      };
    case INDUSTRY_CASE_TYPE.Database:
      return {
        text: 'Базы данных',
      };
    case INDUSTRY_CASE_TYPE.Migration:
      return {
        text: 'Миграция',
      };
    case INDUSTRY_CASE_TYPE.Development:
      return {
        text: 'Разработка',
      };
    case INDUSTRY_CASE_TYPE.Serverless:
      return {
        text: 'Serverless',
      };
    case INDUSTRY_CASE_TYPE.DataAnalytics:
      return {
        text: 'Аналитика данных',
      };
    case INDUSTRY_CASE_TYPE.ManagementAndAdministration:
      return {
        text: 'Управление и администрирование',
      };
    case INDUSTRY_CASE_TYPE.Services:
      return {
        text: 'Услуги',
      };
    case INDUSTRY_CASE_TYPE.DataPlatform:
      return {
        text: 'Платформа данных',
      };
    case INDUSTRY_CASE_TYPE.MlAiInstruments:
      return {
        text: 'ML/AI Инструменты',
      };
    case INDUSTRY_CASE_TYPE.Construction:
      return {
        text: 'Строительство',
      };
    case INDUSTRY_CASE_TYPE.Retail:
      return {
        text: 'Торговля',
      };
    case INDUSTRY_CASE_TYPE.Charity:
      return {
        text: 'Благотворительность',
      };
    case INDUSTRY_CASE_TYPE.AgroIndustry:
      return {
        text: 'Агропромышленность',
      };
    case INDUSTRY_CASE_TYPE.Finance:
      return {
        text: 'Финансы',
      };
    case INDUSTRY_CASE_TYPE.CaseServices:
      return {
        text: 'Услуги',
      };
    case INDUSTRY_CASE_TYPE.Education:
      return {
        text: 'Образование',
      };
    case INDUSTRY_CASE_TYPE.Government:
      return {
        text: 'Государство',
      };
    case INDUSTRY_CASE_TYPE.Media:
      return {
        text: 'Медиа и реклама',
      };
    case INDUSTRY_CASE_TYPE.Healthcare:
      return {
        text: 'Здравоохранение',
      };
    case INDUSTRY_CASE_TYPE.FoodIndustry:
      return {
        text: 'Пищевая промышленность',
      };
    case INDUSTRY_CASE_TYPE.ItDevelopment:
      return {
        text: 'IT-разработка',
      };
    case INDUSTRY_CASE_TYPE.EquipmentSuppliers:
      return {
        text: 'Поставщики оборудования',
      };
    case INDUSTRY_CASE_TYPE.Production:
      return {
        text: 'Производство',
      };
    case INDUSTRY_CASE_TYPE.Telecommunications:
      return {
        text: 'Телекоммуникации',
      };
    case INDUSTRY_CASE_TYPE.Insurance:
      return {
        text: 'Страхование',
      };
    case INDUSTRY_CASE_TYPE.ElectronicEquipment:
      return {
        text: 'Электронная техника',
      };
    case INDUSTRY_CASE_TYPE.Transport:
      return {
        text: 'Транспорт и логистика',
      };

    default:
      return null;
  }
};
