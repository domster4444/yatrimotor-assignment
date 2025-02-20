import { HtmlToReactParser } from 'lib/utilities/utilityFunc';

interface ChildType {
  children: React.ReactNode;
}

const HtmlParser = ({ children }: ChildType) => {
  return <>{HtmlToReactParser(children)}</>;
};

export default HtmlParser;
