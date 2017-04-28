import { Component, Children, cloneElement } from 'react';

interface IFormatterProps extends React.Props<Formatter> {
  data: number[];
  deltas: { [key: string]: number; };
}

export class Formatter extends Component<IFormatterProps, any> {
  public render() {
    const { data, deltas } = this.props;
    const keys = Object.keys(deltas);
    const ammendedData = data.map((c, i) => c + deltas[keys[i]]);
    const points: number[][] = [];

    while (ammendedData.length) {
      points.push(ammendedData.splice(0, 2));
    }

    return cloneElement(
      Children.only(this.props.children),
      {
        points: points.map((p) => p.join(',')).join(' '),
      },
    );
  }
}
