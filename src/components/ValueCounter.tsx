import React from 'react'

export class ValueCounter extends React.Component <any,any>{
    private timer: any;
  
    constructor(props: any) {
      super(props);
      this.state = {
        timeRemainingInSeconds: 85,
        startTime: this.props.isEndAnime ? 85 : 0
      };
    }
  
    decrementTimeRemaining = () => {
      if (this.state.startTime < this.state.timeRemainingInSeconds) {
        this.setState({
            startTime: this.state.startTime + 1
        });
      } else {
        clearInterval(this.timer!);
      }
    };
  
    componentDidMount() {
    if(!this.props.isEndAnime)
      this.timer = setInterval(() => {
        this.decrementTimeRemaining();
      },10);
    }
  
    render() {
      return (
        <div className="countdown-timer">
          <div className="countdown-timer__circle">
            <svg>
              <circle
                r="24"
                cx="26"
                cy="26"
                style={{
                  animation: `countdown-animation ${this.props
                    .startTimeInSeconds}s linear`
                }}
              />
            </svg>
          </div>
          <div className="countdown-timer__text">
            {this.state.startTime}$
          </div>
        </div>
      );
    }
  }