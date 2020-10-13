"use strict";


class Configurate {

	constructor()
	{
		this.REPORT = true;
	}

}

const conf = () => new Configurate();
const configurate = conf();

export { configurate };