const permission = {
	x: 0b001,
	w: 0b011,
	r: 0b100
}

function ex(res, rej) {
	setTimeout(res, 1000, 1)
}

class A{
async run() {
	const res = await new Promise(ex)
	return res
}
}

async function async1() {
	try {
		const res = await new A().run().finally(function(a) {
			console.log(a)
		})
		console.log(res, '23')
	} catch (error) {
		console.log(error)
	}
}

async1()