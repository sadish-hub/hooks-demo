import React, { Component } from 'react';
import axios from 'axios';

class ItemLocator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'http://hn.algolia.com/api/v1/search?query=redux',
            hits: [],
            isError: false,
            isLoading: false,
            query: 'redux'
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ isError: false });
        this.setState({ isLoading: true });
        try {
            const result = await axios(this.state.url);
            this.setState({ hits: result.data.hits });
        } catch (error) {
            this.setState({ isError: true });
        }
        this.setState({ isLoading: false });
    };

    loadItems = () => {
        return this.state.hits.map(item => (
            <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
            </li>
        ));
    };

    render() {
        return (
            <div>
                <form onSubmit={event => {
                    this.setState({url: `http://hn.algolia.com/api/v1/search?query=${this.state.query}`});
                    event.preventDefault();
                }}>
                    <input
                        type="text"
                        value={this.state.query}
                        onChange={event => this.setState({ query: event.target.value })}
                    />
                    <button type="submit">Search</button>
                </form>

                {this.state.isError && <div>Something went wrong ...</div>}
                {this.state.isLoading ? (
                    <div>Loading ...</div>
                ) : (
                    <ul>
                        {this.loadItems()}
                    </ul>
                )}
            </div>
        );
    }
}

export default ItemLocator;