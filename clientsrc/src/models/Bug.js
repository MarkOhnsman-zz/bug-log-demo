export default class Bug {
  constructor(data) {
    this.id = data.id
    this.creator = data.creator
    this.closed = data.closed
    this.description = data.description
    this.title = data.title
    this.closedDate = data.closedDate
    this.creatorEmail = data.creatorEmail
  }
}
