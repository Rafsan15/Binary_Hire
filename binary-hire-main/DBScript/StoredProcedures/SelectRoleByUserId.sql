--region PROCEDURE [dbo].[SelectRoleByUserId] @Id = 1
IF OBJECT_ID('[dbo].[SelectRoleByUserId]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectRoleByUserId] 
    END 
GO 
     
CREATE PROC [dbo].[SelectRoleByUserId] 
(
	@Id INT
)

AS
	SELECT STG.ID AS [RoleId], STG.DisplayText AS [RoleName]
	FROM [dbo].[User] AS U
	LEFT JOIN [dbo].[Setting] AS STG ON STG.ID = U.UserTypeId
	WHERE U.Id = @Id
GO
--endregion

