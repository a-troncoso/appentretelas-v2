import React, { Component } from 'react'

import styles from './content.scss'

class Content extends Component {
	render() {
		return(
			<div className={styles.root}>
				<h1>this is Content component</h1>
			</div>
		)
	}
}

export default Content
