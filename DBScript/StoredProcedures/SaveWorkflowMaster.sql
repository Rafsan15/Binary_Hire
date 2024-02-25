
--region PROCEDURE [dbo].[SaveWorkflowMaster]
IF OBJECT_ID('[dbo].[SaveWorkflowMaster]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SaveWorkflowMaster] 
    END 
GO 
     
CREATE PROC [dbo].[SaveWorkflowMaster] 
( 
	@JsonObject NVARCHAR(MAX)
)
AS

SET NOCOUNT ON;
    BEGIN TRY			
		
		DECLARE @MasterId INT = NULL, @Now DATETIME = getdate();
		DECLARE @TranName VARCHAR(20);  
		SELECT @TranName = 'SaveWorkflowMasterDetails';  

		BEGIN TRANSACTION @TranName;
		
		MERGE [dbo].[WorkflowMaster] as target
		USING (SELECT ID, [Name], OrganizationId, CreatedBy, ModifiedBy
					   FROM OPENJSON(@JsonObject)
				WITH (
					ID  int '$.WorkflowMaster.Id',
					[Name]  NVARCHAR(50) '$.WorkflowMaster.Name',
					OrganizationId int  '$.WorkflowMaster.OrganizationId',
					CreatedBy  int '$.WorkflowMaster.ModifiedBy',
					ModifiedBy  int '$.WorkflowMaster.ModifiedBy'
				)) as source
		ON source.ID IS NOT NULL AND source.ID <> 0 AND source.ID = target.ID
		WHEN MATCHED THEN 
		UPDATE 
			SET [Name] = source.Name, OrganizationId = source.OrganizationId, 
			ModifiedBy = source.ModifiedBy, ModifiedDate = @Now, 
				@MasterId = source.ID

		   WHEN NOT MATCHED THEN
				INSERT ([Name], OrganizationId, CreatedBy, CreatedDate)
				VALUES (source.Name, source.OrganizationId, source.ModifiedBy, @Now);

			IF @MasterId IS NULL 
			BEGIN
				SET @MasterId = SCOPE_IDENTITY();
			END 
			ELSE
			BEGIN
				 --always delete existing one and insert details again
				DELETE FROM [dbo].[WorkflowDetail] WHERE WorkflowMasterId = @MasterId;
			END

			INSERT INTO [dbo].[WorkflowDetail]
					( WorkflowMasterId, WorkflowTypeId, Priority, CreatedBy)
			SELECT @MasterId AS WorkflowMasterId, WorkflowTypeId, Priority, CreatedBy
					   FROM OPENJSON(@JsonObject)
				WITH ( 
				   WorkflowDetail NVARCHAR(MAX) '$.WorkflowDetail' AS JSON
				)
				OUTER APPLY OPENJSON(WorkflowDetail) 
				WITH ( 
					WorkflowMasterId NVARCHAR(128)  '$.WorkflowMasterId',			
					WorkflowTypeId NVARCHAR(128) '$.WorkflowTypeId',
					[Priority] NVARCHAR(128) '$.Priority',
					CreatedBy NVARCHAR(128) '$.ModifiedBy'
				); 

		COMMIT TRANSACTION @TranName;
		SELECT @MasterId;
		
    END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION @TranName;
        DECLARE @SysErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR(@SysErrorMessage, @ErrorSeverity, @ErrorState) WITH SETERROR;

        RETURN -1;

    END CATCH;




GO
--endregion