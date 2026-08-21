import { type FooterHandlers, type FooterSectionItem } from '../../types';
import { FooterLink } from '../FooterLink';
import { FooterSectionTitle } from '../FooterSectionTitle';
import styles from './styles.module.scss';

export type FooterSectionProps = FooterSectionItem & FooterHandlers;

export function FooterSection({
  title,
  titleUrl,
  titleTarget,
  id,
  links,
  onElementClick,
  onNavigate,
}: FooterSectionProps) {
  const sectionId = id ?? title;

  return (
    <div className={styles.root} data-qa={`footer-section-${sectionId}`}>
      <FooterSectionTitle
        title={title}
        titleUrl={titleUrl}
        titleTarget={titleTarget}
        id={id}
        sectionId={sectionId}
        onElementClick={onElementClick}
        onNavigate={onNavigate}
      />

      {links.length > 0 && (
        <ul className={styles.links} data-qa={`footer-section-links-${sectionId}`}>
          {links.map(link => (
            <li className={styles.linkItem} key={link.id ?? link.url ?? link.text}>
              <FooterLink {...link} onElementClick={onElementClick} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
