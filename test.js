const format = require('./src/index')
const assert = require('assert')

it ('should correctly format local dates', () => {
	const date = new Date(2005, 6, 14, 22, 30, 41)
	assert.equal( format("F j, Y, g:i a", date), "July 14, 2005, 10:30 pm" )
	assert.equal( format("m.d.y", date), "07.14.05" )
	assert.equal( format("j, n, Y", date), "14, 7, 2005" )
	assert.equal( format("Ymd", date), "20050714" )
	assert.equal( format('h-i-s, j-m-y, it is w Day', date), "10-30-41, 14-07-05, 3031 3041 4 Thupm05" )
	assert.equal( format("D M j G:i:s Y", date), "Thu Jul 14 22:30:41 2005" )
	assert.equal( format("H:i:s", date), "22:30:41" )
})

it ('should correctly format UTC dates', () => {
	const date = new Date(Date.UTC(2005, 6, 14, 22, 30, 41))
	assert.equal( format.UTC("F j, Y, g:i a", date), "July 14, 2005, 8:30 pm" )
	assert.equal( format.UTC("m.d.y", date), "07.14.05" )
	assert.equal( format.UTC("j, n, Y", date), "14, 7, 2005" )
	assert.equal( format.UTC("Ymd", date), "20050714" )
	assert.equal( format.UTC('h-i-s, j-m-y, it is w Day', date), "08-30-41, 14-07-05, 3031 3041 4 Thupm05" )
	assert.equal( format.UTC("D M j G:i:s Y", date), "Thu Jul 14 20:30:41 2005" )
	assert.equal( format.UTC("H:i:s", date), "20:30:41" )
})
