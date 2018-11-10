export class Entity {
    constructor(
        public namespace: string,
        public id: string,
        public name: string,
        public description: string
    ) {}
}

export class TextData {
    constructor(
        public context: string,
        public value: string
    ) {}
}

export class IndexRequest {
    entity: Entity;
    textData: TextData[] = [];
}
