import * as AvatarPlaceholderIcons from '../src/components/avatarPlaceholder-icons';
import * as ColorIcons from '../src/components/color-icons';
import * as DisplayIcons from '../src/components/display-icons';
import * as ExtensionsIcons from '../src/components/extension-icons';
import * as InterfaceIcons from '../src/components/interface-icons';
import * as LogoIcons from '../src/components/logo-icons';
import * as PlatformIcons from '../src/components/platform-icons';
import * as ServicesIcons from '../src/components/services-icons';
import { generateDataTestId } from '../stories/helpers/generateDataTestId';

describe('[Icons]:', () => {
  function visit(name: string) {
    return cy.visitComponent({
      name: name,
      group: 'icons',
    });
  }

  it('Rendered Avatar Placeholder Icons', () => {
    const name = 'avatar-placeholder';
    const iconsArray = Object.keys(AvatarPlaceholderIcons).map(generateDataTestId);
    visit(name);

    iconsArray.forEach(el => expect(cy.getByDataTestId(el)).to.exist);
  });

  it('Rendered Color Icons', () => {
    const name = 'color';
    const iconsArray = Object.keys(ColorIcons).map(generateDataTestId);
    visit(name);

    iconsArray.forEach(el => expect(cy.getByDataTestId(el)).to.exist);
  });

  it('Rendered Display Icons', () => {
    const name = 'display';
    const iconsArray = Object.keys(DisplayIcons).map(generateDataTestId);
    visit(name);

    iconsArray.forEach(el => expect(cy.getByDataTestId(el)).to.exist);
  });

  it('Rendered Extension Icons', () => {
    const name = 'extension';
    const iconsArray = Object.keys(ExtensionsIcons).map(generateDataTestId);
    visit(name);

    iconsArray.forEach(el => expect(cy.getByDataTestId(el)).to.exist);
  });

  it('Rendered Interfaces Icons', () => {
    const name = 'interfaces';
    const iconsArray = Object.keys(InterfaceIcons).map(generateDataTestId);
    visit(name);

    iconsArray.forEach(el => expect(cy.getByDataTestId(el)).to.exist);
  });

  it('Rendered Logo Icons', () => {
    const name = 'logo';
    const iconsArray = Object.keys(LogoIcons).map(generateDataTestId);
    visit(name);

    iconsArray.forEach(el => expect(cy.getByDataTestId(el)).to.exist);
  });

  it('Rendered Services Icons', () => {
    const name = 'services';
    const iconsArray = Object.keys(ServicesIcons).map(generateDataTestId);
    visit(name);

    iconsArray.forEach(el => expect(cy.getByDataTestId(el)).to.exist);
  });

  it('Rendered Platform Icons', () => {
    const name = 'platform';
    const iconsArray = Object.keys(PlatformIcons).map(generateDataTestId);
    visit(name);

    iconsArray.forEach(el => expect(cy.getByDataTestId(el)).to.exist);
  });
});

export {};
