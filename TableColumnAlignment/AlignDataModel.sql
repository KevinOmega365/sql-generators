
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ltbl_Import_SourceSytem_Entity' AND COLUMN_NAME = 'objectID')
    BEGIN
        ALTER TABLE ltbl_Import_SourceSytem_Entity ADD [objectID] nvarchar(max) NULL;
    END;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ltbl_Import_SourceSytem_Entity' AND COLUMN_NAME = 'objectType')
    BEGIN
        ALTER TABLE ltbl_Import_SourceSytem_Entity ADD [objectType] nvarchar(max) NULL;
    END;