import parse from 'html-react-parser';

export function generateYears() {
  var max = new Date().getFullYear(),
    min = 1900;
  var years = ['All'];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
}

export const HtmlToReactParser = (html) => {
  return parse(html);
};

export const changeDate = (dateString) => {
  return new Date(dateString).toISOString().split('T')[0];
};
