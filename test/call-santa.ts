import { addSantaToAttendees, santaDistributionIsValid, getUniqueRandomNumberList, displayAttendeeList } from "../src/call-santa/functions";
import chai from 'chai';

describe('call-santa/functions.ts', () => {
  it('getUniqueRandomNumberList()', () => {
    chai.expect(getUniqueRandomNumberList(6).reduce((partialSum, a) => partialSum + a, 0)).to.equal(15)
    chai.expect(getUniqueRandomNumberList(6).reduce((partialSum, a) => partialSum + a, 0)).not.equal(14)
    chai.expect(getUniqueRandomNumberList(10).reduce((partialSum, a) => partialSum + a, 0)).to.equal(45)
    chai.expect(getUniqueRandomNumberList(10).reduce((partialSum, a) => partialSum + a, 0)).not.equal(15)
  })
  it('santaDistributionIsValid()', () => {
    chai.expect(santaDistributionIsValid(attendeeList1)).to.equal(false)
    chai.expect(santaDistributionIsValid(attendeeList2)).to.equal(false)
    chai.expect(santaDistributionIsValid(attendeeList3)).to.equal(false)
    chai.expect(santaDistributionIsValid(attendeeList4)).to.equal(true)
  })
  it('addSantaToAttendees()', () => {
    chai.expect(santaDistributionIsValid(addSantaToAttendees(attendeeList1))).to.equal(true)
  })
  it('displayAttendeeList()', () => {
    chai.expect(displayAttendeeList(attendeeList1)).to.equal("1) Leo\n2) Mary\n3) Oscar\n4) Sandy\n5) Owen\n6) Keroro\n7) Dororo\n")
    chai.expect(displayAttendeeList(attendeeList1)).not.equal("1) Keroro\n2) Mary\n3) Oscar\n4) Sandy\n5) Owen\n6) Keroro\n7) Dororo\n")
  })
});

const attendeeList1 = [
  {"name": "Leo", "chatId": 12321312, "wish": "robot"},
  {"name": "Mary", "chatId": 12321312, "wish": "robot"},
  {"name": "Oscar", "chatId": 12321312, "wish": "robot"},
  {"name": "Sandy", "chatId": 12321312, "wish": "robot"},
  {"name": "Owen", "chatId": 12321312, "wish": "robot"},
  {"name": "Keroro", "chatId": 12321312, "wish": "robot"},
  {"name": "Dororo", "chatId": 12321312, "wish": "robot"}
]

const attendeeList2 = [
  {"name": "Leo", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Mary", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Oscar"},
  {"name": "Oscar", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Sandy", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Owen", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Keroro", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Dororo", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"}
]

const attendeeList3 = [
  {"name": "Leo", "chatId": 12321312, "wish": "robot", "havenSanta": "Oscar", "hellSanta": "Mary"},
  {"name": "Mary", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Oscar", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Sandy", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Owen", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Keroro", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Dororo", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"}
]

const attendeeList4 = [
  {"name": "Leo", "chatId": 12321312, "wish": "robot", "havenSanta": "Oscar", "hellSanta": "Mary"},
  {"name": "Mary", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Sandy"},
  {"name": "Oscar", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Sandy", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Owen", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Keroro", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"},
  {"name": "Dororo", "chatId": 12321312, "wish": "robot", "havenSanta": "Leo", "hellSanta": "Mary"}
]