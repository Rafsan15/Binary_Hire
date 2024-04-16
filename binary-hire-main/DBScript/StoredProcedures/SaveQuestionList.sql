IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('[dbo].[SaveQuestionList]')) 
BEGIN
	DROP PROCEDURE [dbo].[SaveQuestionList]
END
GO

CREATE OR ALTER PROCEDURE [dbo].[SaveQuestionList]
( 
    @JsonObject NVARCHAR(MAX)
)
AS
BEGIN  
    SET NOCOUNT ON;
    BEGIN TRY	 
		
        DECLARE @Now DATETIME = GETDATE();
        DECLARE @TranName VARCHAR(20);  
        SELECT @TranName = 'QuestionTransaction';  
        
        BEGIN TRANSACTION @TranName;	
        
        DECLARE @SourceMasterId INT = NULL, @TargetMasterId INT = NULL;

        WITH SourceData AS (
            SELECT
                B.Id AS Id,
                B.OrganizationId,
                A.JobId,
                B.QuestionText,
                B.IsDelete,
                B.ModifiedBy
            FROM OPENJSON(@JsonObject)
            WITH (
                JobId INT,
                QuestionItems NVARCHAR(MAX) AS JSON
            ) A
            OUTER APPLY OPENJSON(A.QuestionItems) C
            OUTER APPLY OPENJSON(C.[value])
            WITH (
                QuestionText NVARCHAR(MAX),
                Id INT,
				OrganizationId INT,
                IsDelete BIT,
                ModifiedBy NVARCHAR(255)
            ) B
        )
        
        MERGE INTO [dbo].[Question] AS Target
        USING SourceData AS Source
        ON Source.ID = Target.ID AND Source.JobId = Target.JobId
        
        WHEN MATCHED THEN
            UPDATE
            SET 
                [Target].[OrganizationId] = Source.OrganizationId,
                [Target].[JobId] = Source.JobId,
                [Target].[QuestionText] = Source.QuestionText,
                [Target].[IsDisabled] = Source.IsDelete,
                [Target].[ModifiedBy] = Source.ModifiedBy,
                [Target].[ModifiedDate] = @Now
            
        WHEN NOT MATCHED BY TARGET THEN 
            INSERT (
                OrganizationId,
                JobId,
                QuestionText,
                IsDisabled,
                CreatedBy,
                CreatedDate
            )
            VALUES (
                Source.OrganizationID,
                Source.JobId,
                Source.QuestionText,
                0,
                Source.ModifiedBy,
                @Now
            );

        COMMIT TRANSACTION @TranName;

        PRINT @SourceMasterId;
        PRINT @TargetMasterId;

    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION @TranName;
        DECLARE @SysErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR(@SysErrorMessage, @ErrorSeverity, @ErrorState) WITH SETERROR;

        RETURN -1;

    END CATCH;
END; 




/*
   EXEC [PlantDistribution].[SaveSubSystemEquipmentMapList] @JsonObject = '{"PlantUnitId":19,"PlantCardItems":[{"SubSystemId":"1","ComponentEquipmentMapId":"1","Id":0,"CreatedBy":4068,"CreatedDate":"2024-01-13T09:20:42.31Z","ModifiedBy":4068,"ModifiedDate":"2024-01-13T09:20:42.31Z"}]}';
*/