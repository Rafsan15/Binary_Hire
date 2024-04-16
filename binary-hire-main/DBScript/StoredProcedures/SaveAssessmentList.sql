IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('[dbo].[SaveAssessmentList]')) 
BEGIN
	DROP PROCEDURE [dbo].[SaveAssessmentList]
END
GO

CREATE OR ALTER PROCEDURE [dbo].[SaveAssessmentList]
( 
    @JsonObject NVARCHAR(MAX)
)
AS
BEGIN  
    SET NOCOUNT ON;
    BEGIN TRY	 
		
        DECLARE @Now DATETIME = GETDATE();
        DECLARE @TranName VARCHAR(20);
        SELECT @TranName = 'AssessmentTransaction';  
        
        BEGIN TRANSACTION @TranName;	
        
        DECLARE @SourceMasterId INT = NULL, @TargetMasterId INT = NULL;

        WITH SourceData AS (
            SELECT
                B.Id AS Id,
                B.OrganizationId,
                B.QuestionId,
                A.ResultId,
                B.Score,
                B.ModifiedBy
            FROM OPENJSON(@JsonObject)
            WITH (
                ResultId INT,
                AssessmentItems NVARCHAR(MAX) AS JSON
            ) A
            OUTER APPLY OPENJSON(A.AssessmentItems) C
            OUTER APPLY OPENJSON(C.[value])
            WITH (
                Score INT,
                QuestionId INT,
                Id INT,
				OrganizationId INT,
                ModifiedBy NVARCHAR(255)
            ) B
        )
        
        MERGE INTO [dbo].[Assessment] AS Target
        USING SourceData AS Source
        ON Source.ID = Target.ID AND Source.ResultId = Target.ResultId
        
        WHEN MATCHED THEN 
            UPDATE 
            SET 
                [Target].[OrganizationId] = Source.OrganizationId,
                [Target].[ResultId] = Source.ResultId,
                [Target].[QuestionId] = Source.QuestionId,
                [Target].[Score] = Source.Score,
                [Target].[ModifiedBy] = Source.ModifiedBy,
                [Target].[ModifiedDate] = @Now
            
        WHEN NOT MATCHED BY TARGET THEN 
            INSERT (
                OrganizationId,
                ResultId,
                QuestionId,
                Score,
                CreatedBy,
                CreatedDate
            )
            VALUES (
                Source.OrganizationId,
                Source.ResultId,
                Source.QuestionId,
                Source.Score,
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