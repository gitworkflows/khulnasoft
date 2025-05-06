import { KhulnasoftBlocks, type KhulnasoftElement } from '@khulnasoft.com/react';

type KhulnasoftProps = {
  column1: React.ReactNode;
  column2: React.ReactNode;
  khulnasoftBlock: KhulnasoftElement;
};

const CustomColumns = (props: KhulnasoftProps) => {
  return (
    <>
      <KhulnasoftBlocks
        parentElementId={props.khulnasoftBlock.id}
        dataPath="column1"
        blocks={props.column1}
      />
      <KhulnasoftBlocks
        parentElementId={props.khulnasoftBlock.id}
        dataPath="column2"
        blocks={props.column2}
      />
    </>
  );
};

export default CustomColumns;
