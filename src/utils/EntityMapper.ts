export interface EntityDBMapper<DomainEntity, DBEntity> {
  dbToDomain(instance: DBEntity): DomainEntity;
  // domain to db seems problematic and useless
  // domainToDb(instance: DomainEntity): DBEntity;
}

export interface EntityInmemMapper<DomainEntity, InmemEntity> {
  inmemToDomain(instance: InmemEntity): DomainEntity;
  domainToInmem(instance: DomainEntity): InmemEntity;
}

export interface EntityDTMapper<DomainEntity, HttpEntity> {
  dtoToDomain(instance: HttpEntity): DomainEntity;
  domainToDto(instance: DomainEntity): HttpEntity;
}

export interface EntitySimpleMapper<DomainEntity, DomainSimpleEntity, DBEntity, HttpSimpleEntity> {
  domainToSimple(instance: DomainEntity): DomainSimpleEntity;
  dbToSimple(instance: DBEntity): DomainSimpleEntity;
  dtosToSimple(instance: HttpSimpleEntity): DomainSimpleEntity;
  simpleToDtos(instance: DomainSimpleEntity): HttpSimpleEntity;
}