
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ltbl_Import_NoakaRest_RevisionFiles' AND COLUMN_NAME = 'INTEGR_REC_GROUPREF')
    BEGIN
        ALTER TABLE ltbl_Import_NoakaRest_RevisionFiles ADD [INTEGR_REC_GROUPREF] uniqueidentifier NULL;
    END;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ltbl_Import_NoakaRest_RevisionFiles' AND COLUMN_NAME = 'INTEGR_REC_BATCHREF')
    BEGIN
        ALTER TABLE ltbl_Import_NoakaRest_RevisionFiles ADD [INTEGR_REC_BATCHREF] uniqueidentifier NULL;
    END;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ltbl_Import_NoakaRest_RevisionFiles' AND COLUMN_NAME = 'INTEGR_REC_STATUS')
    BEGIN
        ALTER TABLE ltbl_Import_NoakaRest_RevisionFiles ADD [INTEGR_REC_STATUS] nvarchar(50) NULL;
    END;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ltbl_Import_NoakaRest_RevisionFiles' AND COLUMN_NAME = 'INTEGR_REC_ERROR')
    BEGIN
        ALTER TABLE ltbl_Import_NoakaRest_RevisionFiles ADD [INTEGR_REC_ERROR] nvarchar(max) NULL;
    END;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ltbl_Import_NoakaRest_RevisionFiles' AND COLUMN_NAME = 'INTEGR_REC_TRACE')
    BEGIN
        ALTER TABLE ltbl_Import_NoakaRest_RevisionFiles ADD [INTEGR_REC_TRACE] nvarchar(max) NULL;
    END;