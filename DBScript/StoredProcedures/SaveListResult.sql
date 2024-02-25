
--region PROCEDURE [dbo].[SaveListResult]
IF OBJECT_ID('[dbo].[SaveListResult]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SaveListResult] 
    END 
GO 
     
CREATE PROC [dbo].[SaveListResult] 
( 
	@JsonObject NVARCHAR(MAX)
)
AS

BEGIN  
    SET NOCOUNT ON;
    BEGIN TRY	 
		
        DECLARE @TranName VARCHAR(20);  
        SELECT @TranName = 'ResultTransaction';  
        
        BEGIN TRANSACTION @TranName;	
        
        INSERT INTO [dbo].[Result] (ScreeningId, [Name], Email, LocationPath, Score, OrganizationId)
		SELECT
			j.ScreeningId,
			j.Name,
			j.Email,
			j.LocationPath,
			j.Score,
			j.OrganizationId
		FROM OPENJSON(@JsonObject) WITH (
			ScreeningId INT,
			Name NVARCHAR(255),
			Email NVARCHAR(255),
			LocationPath NVARCHAR(255),
			Score FLOAT,
			OrganizationId INT
		) AS j;

        COMMIT TRANSACTION @TranName;

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
--endregion