const format = require('./src/index')

const date = new Date('2005-07-14T22:30:41+02:00')
describe('integration tests', () => {
  it('should correctly format local dates', () => {
    expect(format('F j, Y, g:i a', date)).toBe('July 14, 2005, 10:30 pm')
    expect(format('m.d.y', date)).toBe('07.14.05')
    expect(format('j, n, Y', date)).toBe('14, 7, 2005')
    expect(format('Ymd', date)).toBe('20050714')
    expect(format('h-i-s, j-m-y, it is w Day', date)).toBe(
      '10-30-41, 14-07-05, 3031 3041 4 Thupm05'
    )
    expect(format('D M j G:i:s Y', date)).toBe('Thu Jul 14 22:30:41 2005')
    expect(format('H:i:s', date)).toBe('22:30:41')
  })

  it('should correctly format UTC dates', () => {
    expect(format.UTC('F j, Y, g:i a', date)).toBe('July 14, 2005, 8:30 pm')
    expect(format.UTC('m.d.y', date)).toBe('07.14.05')
    expect(format.UTC('j, n, Y', date)).toBe('14, 7, 2005')
    expect(format.UTC('Ymd', date)).toBe('20050714')
    expect(format.UTC('h-i-s, j-m-y, it is w Day', date)).toBe(
      '10-30-41, 14-07-05, 3031 3041 4 Thupm05'
    )
    expect(format.UTC('D M j G:i:s Y', date)).toBe('Thu Jul 14 22:30:41 2005')
    expect(format.UTC('H:i:s', date)).toBe('22:30:41')
  })
})
