
--region PROCEDURE [dbo].[SaveJobNotes]
IF OBJECT_ID('[dbo].[SaveJobNotes]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SaveJobNotes] 
    END 
GO 
     
CREATE PROC [dbo].[SaveJobNotes] 
( 
	@JobPostId INT,
    @Note NVARCHAR(MAX)
)
AS

BEGIN  
    SET NOCOUNT ON;
    BEGIN TRY	 
		
        DECLARE @TranName VARCHAR(20);  
        DECLARE @Ids TABLE (Id INT);
        SELECT @TranName = 'NoteTransaction';  
        
        BEGIN TRANSACTION @TranName;	

        UPDATE [dbo].[JobPost]
        SET [Note] = @Note
        WHERE Id = @JobPostId

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