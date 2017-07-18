import React, { Component } from 'react'
import { render } from 'react-dom'

import Header from '../Header'
import Menu from '../Menu'
import Content from '../Content'

import styles from './app.scss'

import 'normalize-css'

class App extends Component {
	render() {
		return (
			<div className={styles.root}>
				{/*<Header></Header>*/}
				<Menu></Menu>
				<Content> </Content>
			</div>
		)
	}
}

export default App
