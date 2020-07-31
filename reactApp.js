

class Team extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shots: 0,
            score: 0
        }
        this.shotSound = new Audio('./assets/audio/Bounces.mp3')
        this.scoreSound = new Audio('./assets/audio/Swish.mp3')
    }
    shotHandler = () => {
        let score = this.state.score
        this.shotSound.play()

        if (Math.random() > 0.5) {
            score += 1

            setTimeout(() => {
                this.scoreSound.play()
            }, 100)

        }

        this.setState((state, props) => ({
            shots: state.shots + 1,
            score
        }))
    }

    render() {
        let shotPercentageDiv

  if (this.state.shots) {
    const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
    shotPercentageDiv = (
      <div>
        <strong>Shooting %:</strong> {shotPercentage}
      </div>
    )
  }

        return (
            <div className="Team">
                <h2>{this.props.name}</h2>

                <div className="identity">
                    <img src={this.props.logo} alt={this.props.name} />
                </div>


                <div>
                    <strong>Shots:</strong> {this.state.shots}
                </div>

                <div>
                    <strong>Scores:</strong> {this.state.score}
                </div>

               {shotPercentageDiv} 

                <button onClick={this.shotHandler}>Shoot!</button>
            </div>
        )
    }
}
function Game(props) {
    return(
        <div className="Game">
            <h1>Welcome to {props.venue}</h1>
            <div className="stats">
                <Team
                    name={props.visitingTeam.name}
                    logo={props.visitingTeam.logoSrc}
                />

                <div className="versus">
                    <h1>VS</h1>
                </div>

                <Team name={props.homeTeam.name}
                      logo={props.homeTeam.logoSrc}
                />
            </div>
        </div>
    )
}

function App(props) {
    const jayhawks = {
        name:'Kansas Jayhawks',
        logoSrc: './assets/images/Jayhawks.png'
    }
    const wildcats = {
        name:'Kansas Wildcats',
        logoSrc: './assets/images/wildcats.png'
    }
    const bunnies = {
        name:'Ashlynns Bunnies',
        logoSrc: './assets/images/bunny.png'
    }
    const eagles = {
        name:'Jeremys Eagles',
        logoSrc: './assets/images/eagle.png'
    }
    
    return (
        <div className="APP">
        <Game venue="Sprint Center" 
        homeTeam={jayhawks}
        visitingTeam={wildcats}
        />
        <Game venue="Kaffman Center"
         homeTeam={bunnies}
         visitingTeam={eagles}
        />
        </div>
    )
}

//Render the application
ReactDOM.render(
    <App />,
    document.getElementById('root')
)