import React, { useCallback, useState } from 'react';

import { COLORS } from '@app/renderer/theme/color';

import Icon, { glyphs } from '@app/renderer/components/Icon';
import ButtonIconTitle from '../Button/IconTitle';
import { ButtonContainer, ChildrenContainer, Container, H4Style, TopContainer } from './styled';

interface IAccordion {
  title: string;
  children: React.ReactNode;
  onClickAdd?: () => void;
  addButtonTitleId?: string;
  ref: React.RefObject<HTMLDivElement>;
}

const Accordion: React.FC<IAccordion> = (
  { children, title, onClickAdd, addButtonTitleId },
  ref,
) => {
  const [shouldOpen, setShouldOpen] = useState(true);
  const handleClick = useCallback(
    () => {
      setShouldOpen(!shouldOpen);
    },
    [shouldOpen],
  );
  return (
    <Container>
      <TopContainer onClick={handleClick}>
        <h4 css={H4Style}>{title}</h4>
        <Icon
          css={`
            transform: ${shouldOpen ? 'rotate(0.5turn)' : 'rotate(0)'};
            color: ${COLORS.grayText};
          `}
          size={{ width: 15, height: 15 }}
          icon={glyphs.ARROW_DOWN}
        />
      </TopContainer>
      {shouldOpen && <ChildrenContainer>{children}</ChildrenContainer>}
      {shouldOpen && onClickAdd && (
        <ButtonContainer>
          <div ref={ref}>
            <ButtonIconTitle
              titleId={addButtonTitleId}
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                onClickAdd();
              }}
            />
          </div>
        </ButtonContainer>
      )}
    </Container>
  );
};

export default React.forwardRef(Accordion);
