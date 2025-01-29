package hr.fer.zemris.projektD.RealTimeScheduler.mapper;

import hr.fer.zemris.projektD.RealTimeScheduler.dto.TaskDTO;
import hr.fer.zemris.projektD.RealTimeScheduler.model.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    @Mapping(target = "id", expression = "java(UtilMapper.mapObjectIdToString(task.getId()))")
    TaskDTO toDTO(Task task);

    @Mapping(target = "id", expression = "java(UtilMapper.mapStringToObjectId(taskDTO.getId()))")
    Task toEntity(TaskDTO taskDTO);

    @Mapping(target = "id", expression = "java(UtilMapper.mapStringToObjectId(taskDTO.getId()))")
    void updateEntity(TaskDTO taskDTO, @MappingTarget Task task);
}
