
import React from 'react';
import ReactDOM from 'react-dom';
interface  TitleProps { title: string, background: string, entry: string, subColor: any };
interface  TitleState { pos: any, shadow: boolean, colors: any[], background:any,text:any,bold:any };
// const App = ({}: MyProps) => {
//     const [value, setValue] = useState<string>('');
//     ...
//   };
export default class Title extends React.Component<TitleProps,TitleState>{
	constructor(props: any) {
		super(props);
		this.section = React.createRef();
		this.playword_1 = React.createRef();
		this.playword_2 = React.createRef();
		this.state = {
			pos: { x: 0, y: 0 },
			shadow: true,
			colors: [
				{
					background: `#2A2C39`,
					text: `#ffffff`,
					bold: `#FF4056`
				},
				{
					background: `#FCF751`,
					text: `#2A2C39`,
					bold: `#14151c`
				}
			],
			background: null,
			text: null,
			bold: null
		};
	}
	section: any = null;
	playword_1: any = null;
	playword_2: any = null;

	componentDidMount() {
		this.RandomBackground();
	}

	onMouseMove(e: any) {
		this.setState({
			pos: {
				x: e.pageX,
				y: e.pageY
			}
		});

		this.CreateShadow();
	}

	CreateShadow() {
		if (`ontouchstart` in window === false && this.state.shadow) {
			let [moveX, moveY] = [this.state.pos.x / -100, this.state.pos.y / -120];

			let [Section, firstWord, secondWord]: any = [
				ReactDOM.findDOMNode(this.section.current),
				ReactDOM.findDOMNode(this.playword_1.current),
				ReactDOM.findDOMNode(this.playword_2.current)
			];
            if(firstWord && secondWord && Section){
                firstWord.style.transform = `translate3d(${moveX / 2}px, ${moveY}px, 0)`;
                secondWord.style.transform = `translate3d(${moveX / 2}px, ${moveY}px, 0)`;
                Section.style.textShadow = `${moveX}px ${-moveY}px rgba(0, 0, 0, 0.1)`; 
            }
		}
	}

	RandomBackground() {
		let getRandomInt = (min: any, max: any) => {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		let RandomID = getRandomInt(0, 1);
			// SelectColor = this.state.colors[RandomID];

		// console.log(RandomID);

		this.setState({
			background: this.state.colors[RandomID].background,
			text: this.state.colors[RandomID].text,
			bold: this.state.colors[RandomID].bold
		});
	}

	render() { 
		let boldStyle = {
			color: this.props.background
		};

		return (
			<section
			
			style={{position:'absolute',top:-50,bottom:0,left:0,right:0,alignSelf:'center'}}
				id={`title`}
				onMouseMove={this.onMouseMove.bind(this)} 
			>
				<h1 className={this.props.subColor} ref={this.section}>
						{/* {this.props.entry}{` `} */}
					<span className={`${this.props.subColor}`} ref={this.playword_1}>
						{this.props.entry}
					</span> 
					<br /> 
					<span className={`bold`} ref={this.playword_2} style={boldStyle}> 
					</span> 
				</h1>
			</section>
		);
	}
}

// React.render(<App />, document.querySelector(`body`));