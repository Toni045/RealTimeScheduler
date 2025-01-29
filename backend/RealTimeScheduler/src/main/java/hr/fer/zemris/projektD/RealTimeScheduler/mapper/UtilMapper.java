package hr.fer.zemris.projektD.RealTimeScheduler.mapper;

import org.bson.types.ObjectId;

public class UtilMapper {

    // Custom mapping methods
    static String mapObjectIdToString(ObjectId objectId) {
        return objectId != null ? objectId.toHexString() : null;
    }

    static ObjectId mapStringToObjectId(String id) {
        return id.isBlank() ? new ObjectId() : new ObjectId(id);
    }
}
