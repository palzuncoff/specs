import React, { Component } from 'react';
import shaffle  from 'lodash.shuffle';
import './App.css';

const values = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15
];
const winn = JSON.stringify({
    A: [1, 2, 3, 4],
    B: [5, 6, 7, 8],
    C: [9, 10, 11, 12],
    D: [13, 14, 15, 0],
});

class App extends Component {
    state = {
        field: {
            A: [],
            B: [],
            C: [],
            D: [],
        },
        error: false,
    };

    handleStartGame = () => {
        const { field } = this.state;
        const game = { ...field };
        const items = shaffle(values);
        game.A = items.slice(0, 4);
        game.B = items.slice(4, 8);
        game.C = items.slice(8, 12);
        game.D = items.slice(-4);
        this.setState({ field: game, onGame: true });
    };

    handleMoveSpeck = (item) => {
        const field = { ...this.state.field };
        const consts = [ 'A', 'B', 'C', 'D', ];
        const coordinates = item.split('_');
        const row = coordinates[0];
        const coll = coordinates[1];
        const val = field[row][coll];

        const left = +coll > 0 ? +coll - 1 : -1;
        const right = +coll < 3 ? +coll + 1 : -1;
        const up = consts.indexOf(row) > 0 ? consts.indexOf(row) - 1 : -1;
        const down = consts.indexOf(row) < 3 ? consts.indexOf(row) + 1 : -1;


        if (left > -1 && field[row][left] === 0) {
            field[row][left] = val;
            field[row][coll] = 0;

            return this.setState({ field, error: false });
        }
        if (right > -1 && field[row][right] === 0) {
            field[row][right] = val;
            field[row][coll] = 0;

            return this.setState({ field, error: false });
        }
        if (up > -1 && field[consts[up]][coll] === 0) {
            field[consts[up]][coll] = val;
            field[row][coll] = 0;

            return this.setState({ field, error: false });
        }
        if (down > -1 && field[consts[down]][coll] === 0) {
            field[consts[down]][coll] = val;
            field[row][coll] = 0;

            return this.setState({ field, error: false });
        }

        return this.setState({ error: true });
    };

    addRow = (row, items) => items.map((item, index) => (
            <span
                key={item}
                id={item}
                onClick={() => this.handleMoveSpeck(`${row}_${index}`)}
            >{item !== 0 && item }</span>
        ));


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">SPECKS</h1>
                </header>
                <input className="button" type="button" onClick={this.handleStartGame} value="Start new game"/>
                <div className="specks">
                    <div className="flex-container">
                        {this.addRow('A', this.state.field.A)}
                    </div>
                    <div className="flex-container">
                        {this.addRow('B', this.state.field.B)}
                    </div>
                    <div className="flex-container">
                        {this.addRow('C', this.state.field.C)}
                    </div>
                    <div className="flex-container">
                        {this.addRow('D', this.state.field.D)}
                    </div>
                </div>
                {this.state.error && <h1 className="error">Wrong Move</h1>}
                {JSON.stringify(this.state.field) === winn && <h1>You Winn</h1>}
            </div>
        );
    }
}

export default App;
