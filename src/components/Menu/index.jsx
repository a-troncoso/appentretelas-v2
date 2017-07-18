import React, { Component} from 'react'

import styles from './menu.scss'

class Menu extends Component {

	constructor() {
		super()

		this.state = {
			menu: [
				{
					id: 3,
					name: 'Dashboard',
					icon: 'fa-tachometer',
					childrens: [],
					active: false
				},
				{
					id: 1,
					name: 'Negocio',
					icon: 'fa-shopping-basket',
					childrens:[
						{
							name: 'Compras'
						},
						{
							name: 'Ventas'
						},
						{
							name: 'Inventario'
						}
					],
					active: false
				},
				{
					id: 2,
					name: 'Administración',
					icon: 'fa-cogs',
					childrens: [
						{
							name: 'Vendedores'
						}
					],
					active: false
				}
			]
		}

		this.toggleClass = this.toggleClass.bind(this)
	}


	toggleClass(menuItem) {
		if(menuItem.childrens.length === 0) return

		let menu = this.state.menu.map(item => {
			if(item.id === menuItem.id) item.active = !item.active
			return item
		})


		this.setState(menu)
	}

	render() {
		return ( 
			<div className={styles.root}>
				<nav className={styles.menu}>

					<ul>
						{this.state.menu.map((menuItem) => {
							return(
								<li key={menuItem.id}>
									<a
										onClick={() => this.toggleClass(menuItem)}>
										<i className={"fa " + menuItem.icon} aria-hidden="true"></i> {menuItem.name}
									</a>


									<ul className={menuItem.active ? styles.menuActive: styles.menuDisactive}>
									
									{menuItem.childrens.map((submenu, submenuKey) => {
										return(
											<li key={submenuKey}><a>{submenu.name}</a></li>
										)
									})}
										
									</ul>

								</li>
							)
						})}
					</ul>
				</nav>
			</div>
		)
	}
}

export default Menu