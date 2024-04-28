import {Lesson} from './lesson';

export class Course {
  constructor(
    public key?: string,
    public name?: string,
    public category?: string,
    public difficulty?: number,
    public createdAt?: Date,
    public description?: string,
    public status?: number,
    public lessons?: Lesson[],
  ) {
  }

  static difficulties(): Map<number, string> {
    return new Map([[1, 'easy'], [2, 'medium'], [3, 'hard']]);
  }

  static statuses(): Map<number, string> {
    return new Map([[1, 'done'], [2, 'to do'], [3, 'in progress']]);
  }

  getDifficulty(): string {
    return Course.difficulties().get(this.difficulty);
  }

  getStatus(): string {
    return Course.statuses().get(this.status);
  }
}
