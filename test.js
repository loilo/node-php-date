const format = require('./src/date')

const date = new Date('2005-07-14T22:30:41+02:00')

describe('unit tests', () => {
  describe('local times', () => {
    it("should correctly format the 'd' token", () => {
      expect(format('d', date)).toBe('14')
    })

    it("should correctly format the 'D' token", () => {
      expect(format('D', date)).toBe('Thu')
    })

    it("should correctly format the 'j' token", () => {
      expect(format('j', date)).toBe('14')
    })

    it("should correctly format the 'l' token", () => {
      expect(format('l', date)).toBe('Thursday')
    })

    it("should correctly format the 'N' token", () => {
      expect(format('N', date)).toBe('4')
    })

    it("should correctly format the 'S' token", () => {
      expect(format('S', date)).toBe('th')

      const stDate = new Date(+date)
      stDate.setDate(1)
      expect(format('S', stDate)).toBe('st')

      const ndDate = new Date(+date)
      ndDate.setDate(2)
      expect(format('S', ndDate)).toBe('nd')

      const rdDate = new Date(+date)
      rdDate.setDate(3)
      expect(format('S', rdDate)).toBe('rd')
    })

    it("should correctly format the 'w' token", () => {
      expect(format('w', date)).toBe('4')
    })

    it("should correctly format the 'z' token", () => {
      expect(format('z', date)).toBe('194')
    })

    it("should correctly format the 'W' token", () => {
      expect(format('W', date)).toBe('28')
    })

    it("should correctly format the 'F' token", () => {
      expect(format('F', date)).toBe('July')
    })

    it("should correctly format the 'm' token", () => {
      expect(format('m', date)).toBe('07')
    })

    it("should correctly format the 'M' token", () => {
      expect(format('M', date)).toBe('Jul')
    })

    it("should correctly format the 'n' token", () => {
      expect(format('n', date)).toBe('7')
    })

    it("should correctly format the 't' token", () => {
      expect(format('t', date)).toBe('31')
    })

    it("should correctly format the 'L' token", () => {
      expect(format('L', date)).toBe('0')
    })

    it("should correctly format the 'o' token", () => {
      expect(format('o', date)).toBe('2005')
    })

    it("should correctly format the 'Y' token", () => {
      expect(format('Y', date)).toBe('2005')
    })

    it("should correctly format the 'y' token", () => {
      expect(format('y', date)).toBe('05')
    })

    it("should correctly format the 'a' token", () => {
      expect(format('a', date)).toBe('pm')
    })

    it("should correctly format the 'A' token", () => {
      expect(format('A', date)).toBe('PM')
    })

    it("should correctly format the 'B' token", () => {
      expect(format('B', date)).toBe('896') // TZ dependent
    })

    it("should correctly format the 'g' token", () => {
      expect(format('g', date)).toBe('10')
    })

    it("should correctly format the 'G' token", () => {
      expect(format('G', date)).toBe('22')
    })

    it("should correctly format the 'h' token", () => {
      expect(format('h', date)).toBe('10')
    })

    it("should correctly format the 'H' token", () => {
      expect(format('H', date)).toBe('22')
    })

    it("should correctly format the 'i' token", () => {
      expect(format('i', date)).toBe('30')
    })

    it("should correctly format the 's' token", () => {
      expect(format('s', date)).toBe('41')
    })

    it("should correctly format the 'u' token", () => {
      expect(format('u', date)).toBe('000000')
    })

    it("should correctly format the 'v' token", () => {
      expect(format('v', date)).toBe('000')
    })

    it("should correctly format the 'I' token", () => {
      expect(format('I', date)).toBe('1') // TZ dependent
    })

    it("should correctly format the 'O' token", () => {
      expect(format('O', date)).toBe('+0200') // TZ dependent
    })

    it("should correctly format the 'P' token", () => {
      expect(format('P', date)).toBe('+02:00') // TZ dependent
    })

    it("should correctly format the 'Z' token", () => {
      expect(format('Z', date)).toBe('7200') // TZ dependent
    })

    it("should correctly format the 'c' token", () => {
      expect(format('c', date)).toBe('2005-07-14T22:30:41+02:00') // TZ dependent
    })

    it("should correctly format the 'r' token", () => {
      expect(format('r', date)).toBe('Thu, 14 Jul 2005 22:30:41 +0200') // TZ dependent
    })

    it("should correctly format the 'U' token", () => {
      expect(format('U', date)).toBe('1121373041') // TZ dependent
    })
  })

  describe('UTC time', () => {
    it("should correctly format the 'd' token", () => {
      expect(format.UTC('d', date)).toBe('14')
    })

    it("should correctly format the 'D' token", () => {
      expect(format.UTC('D', date)).toBe('Thu')
    })

    it("should correctly format the 'j' token", () => {
      expect(format.UTC('j', date)).toBe('14')
    })

    it("should correctly format the 'l' token", () => {
      expect(format.UTC('l', date)).toBe('Thursday')
    })

    it("should correctly format the 'N' token", () => {
      expect(format.UTC('N', date)).toBe('4')
    })

    it("should correctly format the 'S' token", () => {
      expect(format.UTC('S', date)).toBe('th')
    })

    it("should correctly format the 'w' token", () => {
      expect(format.UTC('w', date)).toBe('4')
    })

    it("should correctly format the 'z' token", () => {
      expect(format.UTC('z', date)).toBe('194')
    })

    it("should correctly format the 'W' token", () => {
      expect(format.UTC('W', date)).toBe('28')
    })

    it("should correctly format the 'F' token", () => {
      expect(format.UTC('F', date)).toBe('July')
    })

    it("should correctly format the 'm' token", () => {
      expect(format.UTC('m', date)).toBe('07')
    })

    it("should correctly format the 'M' token", () => {
      expect(format.UTC('M', date)).toBe('Jul')
    })

    it("should correctly format the 'n' token", () => {
      expect(format.UTC('n', date)).toBe('7')
    })

    it("should correctly format the 't' token", () => {
      expect(format.UTC('t', date)).toBe('31')
    })

    it("should correctly format the 'L' token", () => {
      expect(format.UTC('L', date)).toBe('0')
    })

    it("should correctly format the 'o' token", () => {
      expect(format.UTC('o', date)).toBe('2005')
    })

    it("should correctly format the 'Y' token", () => {
      expect(format.UTC('Y', date)).toBe('2005')
    })

    it("should correctly format the 'y' token", () => {
      expect(format.UTC('y', date)).toBe('05')
    })

    it("should correctly format the 'a' token", () => {
      expect(format.UTC('a', date)).toBe('pm')
    })

    it("should correctly format the 'A' token", () => {
      expect(format.UTC('A', date)).toBe('PM')
    })

    it("should correctly format the 'B' token", () => {
      expect(format.UTC('B', date)).toBe('896')
    })

    it("should correctly format the 'g' token", () => {
      expect(format.UTC('g', date)).toBe('8')
    })

    it("should correctly format the 'G' token", () => {
      expect(format.UTC('G', date)).toBe('20')
    })

    it("should correctly format the 'h' token", () => {
      expect(format.UTC('h', date)).toBe('08')
    })

    it("should correctly format the 'H' token", () => {
      expect(format.UTC('H', date)).toBe('20')
    })

    it("should correctly format the 'i' token", () => {
      expect(format.UTC('i', date)).toBe('30')
    })

    it("should correctly format the 's' token", () => {
      expect(format.UTC('s', date)).toBe('41')
    })

    it("should correctly format the 'u' token", () => {
      expect(format.UTC('u', date)).toBe('000000')
    })

    it("should correctly format the 'v' token", () => {
      expect(format.UTC('v', date)).toBe('000')
    })

    it("should correctly format the 'I' token", () => {
      expect(format.UTC('I', date)).toBe('0')
    })

    it("should correctly format the 'O' token", () => {
      expect(format.UTC('O', date)).toBe('+0000')
    })

    it("should correctly format the 'P' token", () => {
      expect(format.UTC('P', date)).toBe('+00:00')
    })

    it("should correctly format the 'Z' token", () => {
      expect(format.UTC('Z', date)).toBe('0')
    })

    it("should correctly format the 'c' token", () => {
      expect(format.UTC('c', date)).toBe('2005-07-14T20:30:41+00:00')
    })

    it("should correctly format the 'r' token", () => {
      expect(format.UTC('r', date)).toBe('Thu, 14 Jul 2005 20:30:41 +0000')
    })

    it("should correctly format the 'U' token", () => {
      expect(format.UTC('U', date)).toBe('1121373041')
    })
  })
})

describe('integration tests', () => {
  it('should respect escape characters', () => {
    expect(format('d.m.\\Y', date)).toBe('14.07.Y')
    expect(format('d.m.\\\\Y', date)).toBe('14.07.\\2005')
    expect(format('d.m.\\\\\\Y', date)).toBe('14.07.\\Y')
    expect(format('\\.\\\\', date)).toBe('.\\')
  })

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
      '08-30-41, 14-07-05, 3031 3041 4 Thupm05'
    )
    expect(format.UTC('D M j G:i:s Y', date)).toBe('Thu Jul 14 20:30:41 2005')
    expect(format.UTC('H:i:s', date)).toBe('20:30:41')
  })
})
