
--region PROCEDURE [dbo].[DeleteJobPost]
IF OBJECT_ID('[dbo].[DeleteJobPost]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[DeleteJobPost] 
    END 
GO 
     
CREATE PROC [dbo].[DeleteJobPost] 
( 
	@JsonObject NVARCHAR(MAX)
)
AS

BEGIN  
    SET NOCOUNT ON;
    BEGIN TRY	 
		
        DECLARE @TranName VARCHAR(20);  
        DECLARE @Ids TABLE (Id INT);
        SELECT @TranName = 'JobpostTransaction';  
        
        BEGIN TRANSACTION @TranName;	
        
        INSERT INTO @Ids (Id)
        SELECT value FROM OPENJSON(@JsonObject, '$.Ids')

        UPDATE [dbo].[JobPost]
        SET [IsDisabled] = 1
        WHERE Id IN (SELECT Id FROM @Ids)

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