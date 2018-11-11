import { TextData } from './text-data';
import { Entity } from './entity';

export class IndexRequest {
    entity: Entity;
    textData: TextData[] = [];
}
