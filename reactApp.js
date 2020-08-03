
function Team(props) {
    let shotPercentageDiv

    if (props.stats.shots) {
        const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
        shotPercentageDiv = (
            <div>
                <strong>Shooting %:</strong> {shotPercentage}
            </div>
        )
    }


    return (
        <div className="Team">
            <h2>{props.name}</h2>

            <div className="identity">
                <img src={props.logo} alt={props.name} />
            </div>


            <div>
                <strong>Shots:</strong> {props.stats.shots}
            </div>

            <div>
                <strong>Scores:</strong> {props.stats.score}
            </div>

            {shotPercentageDiv}

            <button onClick={props.shotHandler}>Shoot!</button>
        </div>
    )

}
class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            resetCount: 0,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }

        this.shotSound = new Audio('./assets/audio/Bounces.mp3')
        this.scoreSound = new Audio('./assets/audio/Swish.mp3')

    }
    shoot = (team) => {
        const teamStatKey = `${team}TeamStats`
        let score = this.state[teamStatKey].score
        this.shotSound.play()

        if (Math.random() > 0.5) {
            score += 1

            setTimeout(() => {
                this.scoreSound.play()
            }, 100)

        }

        this.setState((state, props) => ({
            [teamStatKey]: {
                shots: state[teamStatKey].shots + 1,
                score
            }
        }))
    }

    resetGame = () => {
        this.setState((state, props) => ({
            resetCount: state.resetCount + 1,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }))
    }

    render() {
        console.log(this.props)
        return (
            <div className="Game">
                <h1>Welcome to {this.props.venue}</h1>
                <div className="stats">
                    <Team
                        name={this.props.visitingTeam.name}
                        logo={this.props.visitingTeam.logoSrc}
                        stats={this.state.visitingTeamStats}
                        shotHandler={() => this.shoot('visiting')}
                    />

                    <div className="versus">
                        <h1>VS</h1>
                        <div>
                            <strong>Resets:</strong>{this.state.resetCount}
                            <button onClick={this.resetGame}>Reset Game</button>
                        </div>
                    </div>

                    <Team
                        name={this.props.homeTeam.name}
                        logo={this.props.homeTeam.logoSrc}
                        stats={this.state.homeTeamStats}
                        shotHandler={() => this.shoot('home')}
                    />
                </div>
            </div>
        )
    }
}

function App(props) {
    const jayhawks = {
        name: 'Kansas Jayhawks',
        logoSrc: './assets/images/Jayhawks.png'
    }
    const wildcats = {
        name: 'Kansas Wildcats',
        logoSrc: './assets/images/wildcats.png'
    }
    const bunnies = {
        name: 'Ashlynns Bunnies',
        logoSrc: './assets/images/bunny.png'
    }
    const eagles = {
        name: 'Jeremys Eagles',
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