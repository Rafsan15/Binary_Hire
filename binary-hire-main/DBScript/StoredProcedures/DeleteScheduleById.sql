--region PROCEDURE [dbo].[DeleteScheduleById]
IF OBJECT_ID('[dbo].[DeleteScheduleById]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[DeleteScheduleById] 
    END 
GO 
     
CREATE PROC [dbo].[DeleteScheduleById] 
( 
	@Id INT
)
AS
	DELETE [dbo].[Schedule] WHERE Id = @Id
GO
--endregion
