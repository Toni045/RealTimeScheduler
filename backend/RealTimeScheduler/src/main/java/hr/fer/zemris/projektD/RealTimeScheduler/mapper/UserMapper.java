package hr.fer.zemris.projektD.RealTimeScheduler.mapper;

import hr.fer.zemris.projektD.RealTimeScheduler.dto.UserDTO;
import hr.fer.zemris.projektD.RealTimeScheduler.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "id", expression = "java(UtilMapper.mapObjectIdToString(user.getId()))")
    UserDTO toDTO(User user);

    @Mapping(target = "id", expression = "java(UtilMapper.mapStringToObjectId(userDTO.getId()))")
    User toEntity(UserDTO userDTO);

    @Mapping(target = "id", expression = "java(UtilMapper.mapStringToObjectId(userDTO.getId()))")
    void updateEntity(UserDTO userDTO, @MappingTarget User user);
}
