import React, { Component } from 'react';
import { Motion, spring, presets, OpaqueConfig } from 'react-motion';

import { Svg } from 'components/svg';
import { Polygon } from 'components/polygon';
import { Formatter } from 'components/formatter';

interface IStylez {
  [key: string]: OpaqueConfig;
}

interface IDeltas {
  [key: string]: number;
}

interface IRootState {
  points: number[];
  stylez: IStylez;
}

export interface IRootProps extends React.Props<Root> {
  blur: number;
  count: number;
  size: number;
  frequency: number;
  range: number;
}

export class Root extends Component<IRootProps, IRootState> {
  private interval: number;

  constructor(props: IRootProps) {
    super(props);

    const { size, count, frequency, range } = props;
    const radius = size / 2 - range;
    const points = [];

    for (let i = 0; i < count; i++) {
      points.push(
        size / 2 + radius * Math.sin(2 * Math.PI * i / count),
        size / 2 + radius * Math.cos(2 * Math.PI * i / count),
      );
    }

    this.state = {
      points,
      stylez: this.getStylez(),
    };
  }

  public componentDidMount() {
    const { frequency } = this.props;

    this.interval = setInterval(() => this.randomize(), frequency);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
    const { size, blur } = this.props;
    const { points, stylez } = this.state;

    return (
      <Svg width={size} height={size}>
        <filter id="batman">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
        </filter>
        <Motion style={stylez}>
          {(deltas: IDeltas) => (
            <Formatter
                data={points}
                deltas={deltas}>
              <Polygon filter="url(#batman)" />
            </Formatter>
          )}
        </Motion>
      </Svg>
    );
  }

  private getStylez(): IStylez {
    const { count, range } = this.props;

    return {
      ...Array.apply(null, Array(2 * count))
          .map(() => spring((2 * Math.random() - 1) * range, presets.wobbly)),
    };
  }

  private randomize(): void {
    this.setState((prevState) => ({
      ...prevState,
      stylez: this.getStylez(),
    }));
  }
}
