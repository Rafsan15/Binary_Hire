
--region PROCEDURE [dbo].[UpdateJobFavourite]
IF OBJECT_ID('[dbo].[UpdateJobFavourite]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[UpdateJobFavourite] 
    END 
GO 
     
CREATE PROC [dbo].[UpdateJobFavourite] 
( 
	@Id INT, 
	@IsFav BIT,
	@ModifiedBy INT 
)
AS
DECLARE @LocalId INT = @Id;
DECLARE @LocalIsFav BIT = @IsFav;
DECLARE @LocalModifiedBy INT = @ModifiedBy;

UPDATE [dbo].[JobPost]
	SET
		[IsFav] = @LocalIsFav, [ModifiedBy] = @LocalModifiedBy, [ModifiedDate] = GETDATE()
		WHERE [Id] = @LocalId

SELECT @LocalId
GO
--endregion

