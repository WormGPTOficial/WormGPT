Option Explicit

Sub Build_Royal_Palaces_Automation()

    Dim wb As Workbook
    Dim wsDash As Worksheet, wsAll As Worksheet, wsForm As Worksheet
    Dim wsLists As Worksheet, wsCalc As Worksheet
    Dim lo As ListObject
    Dim lastRow As Long
    Dim i As Long
    Dim techDict As Object
    Dim c As Range

    Application.ScreenUpdating = False
    Application.DisplayAlerts = False

    Set wb = ThisWorkbook
    Set wsDash = wb.Worksheets("Dashboard")
    Set wsAll = wb.Worksheets("All Sites")
    Set wsForm = wb.Worksheets("Data Entry")

    On Error Resume Next
    Set wsLists = wb.Worksheets("Lists")
    Set wsCalc = wb.Worksheets("Calc")
    On Error GoTo 0

    If wsLists Is Nothing Then
        Set wsLists = wb.Worksheets.Add(After:=wb.Worksheets(wb.Worksheets.Count))
        wsLists.Name = "Lists"
    Else
        wsLists.Cells.Clear
    End If

    If wsCalc Is Nothing Then
        Set wsCalc = wb.Worksheets.Add(After:=wb.Worksheets(wb.Worksheets.Count))
        wsCalc.Name = "Calc"
    Else
        wsCalc.Cells.Clear
    End If

    '========================
    ' 1) Build table on All Sites
    '========================
    lastRow = wsAll.Cells(wsAll.Rows.Count, "F").End(xlUp).Row
    If lastRow < 5 Then
        MsgBox "No data found in All Sites.", vbExclamation
        Exit Sub
    End If

    On Error Resume Next
    wsAll.ListObjects("tbl_sites").Delete
    On Error GoTo 0

    Set lo = wsAll.ListObjects.Add(SourceType:=xlSrcRange, Source:=wsAll.Range("A4:T" & lastRow), XlListObjectHasHeaders:=xlYes)
    lo.Name = "tbl_sites"
    lo.TableStyle = "TableStyleMedium2"

    '========================
    ' 2) Build Lists sheet
    '========================
    wsLists.Range("A1").Value = "Region"
    wsLists.Range("A2").Value = "Central"
    wsLists.Range("A3").Value = "West"

    wsLists.Range("B1").Value = "Site Status"
    wsLists.Range("B2").Value = "COMPLETED"
    wsLists.Range("B3").Value = "UNDER PROGRESS"
    wsLists.Range("B4").Value = "PENDING"
    wsLists.Range("B5").Value = "HOLD"

    wsLists.Range("C1").Value = "Priority"
    wsLists.Range("C2").Value = "High"
    wsLists.Range("C3").Value = "Medium"
    wsLists.Range("C4").Value = "Low"
    wsLists.Range("C5").Value = "Tba"

    wsLists.Range("D1").Value = "Stage Status"
    wsLists.Range("D2").Value = "COMPLETED"
    wsLists.Range("D3").Value = "UNDER PROGRESS"
    wsLists.Range("D4").Value = "PENDING"
    wsLists.Range("D5").Value = "HOLD"

    wsLists.Range("E1").Value = "Escalation"
    wsLists.Range("E2").Value = "PM"

    wsLists.Range("F1").Value = "Pending With"
    wsLists.Range("F2").Value = "Internal"
    wsLists.Range("F3").Value = "External"

    wsLists.Range("G1").Value = "Technology"
    Set techDict = CreateObject("Scripting.Dictionary")

    For Each c In wsAll.Range("I5:I" & lastRow)
        If Trim(c.Value) <> "" Then
            If Not techDict.Exists(Trim(c.Value)) Then
                techDict.Add Trim(c.Value), Trim(c.Value)
            End If
        End If
    Next c

    i = 2
    Dim key As Variant
    For Each key In techDict.Keys
        wsLists.Cells(i, 7).Value = key
        i = i + 1
    Next key

    wsLists.Columns("A:G").AutoFit

    '========================
    ' 3) Data validation in Data Entry
    '========================
    With wsForm
        .Range("B5:B13,F5:F12").Validation.Delete

        AddListValidation .Range("B5"), "=Lists!$A$2:$A$3"   ' Region
        AddListValidation .Range("B10"), "=Lists!$C$2:$C$5"  ' Priority
        AddListValidation .Range("B11"), "=Lists!$B$2:$B$5"  ' Site Status
        AddListValidation .Range("B12"), "=Lists!$G$2:$G$200" ' Technology

        AddListValidation .Range("F5"), "=Lists!$D$2:$D$5"   ' Permits
        AddListValidation .Range("F6"), "=Lists!$D$2:$D$5"   ' Survey
        AddListValidation .Range("F7"), "=Lists!$D$2:$D$5"   ' Design
        AddListValidation .Range("F8"), "=Lists!$D$2:$D$5"   ' Approvals
        AddListValidation .Range("F9"), "=Lists!$D$2:$D$5"   ' Execution
        AddListValidation .Range("F10"), "=Lists!$D$2:$D$5"  ' Delivery
        AddListValidation .Range("F11"), "=Lists!$E$2:$E$2"  ' Escalation
        AddListValidation .Range("F12"), "=Lists!$F$2:$F$3"  ' Pending With

        .Range("B5:B13,F5:F12").Interior.Color = RGB(255, 242, 204)
    End With

    '========================
    ' 4) Calc sheet
    '========================
    wsCalc.Range("A1:B1").Value = Array("Metric", "Value")
    wsCalc.Range("A2").Value = "Total Sites"
    wsCalc.Range("B2").Formula = "=COUNTA(tbl_sites[Site ID])"

    wsCalc.Range("A3").Value = "Completed"
    wsCalc.Range("B3").Formula = "=COUNTIF(tbl_sites[Site Status],""COMPLETED"")"

    wsCalc.Range("A4").Value = "In Progress"
    wsCalc.Range("B4").Formula = "=COUNTIF(tbl_sites[Site Status],""UNDER PROGRESS"")"

    wsCalc.Range("A5").Value = "Pending"
    wsCalc.Range("B5").Formula = "=COUNTIF(tbl_sites[Site Status],""PENDING"")"

    wsCalc.Range("A6").Value = "On Hold"
    wsCalc.Range("B6").Formula = "=COUNTIF(tbl_sites[Site Status],""HOLD"")"

    wsCalc.Range("A7").Value = "Central"
    wsCalc.Range("B7").Formula = "=COUNTIF(tbl_sites[Region],""Central"")"

    wsCalc.Range("A8").Value = "West"
    wsCalc.Range("B8").Formula = "=COUNTIF(tbl_sites[Region],""West"")"

    wsCalc.Range("A9").Value = "High Priority"
    wsCalc.Range("B9").Formula = "=COUNTIF(tbl_sites[Priority],""High"")"

    wsCalc.Range("A12:G12").Value = Array("Region", "Total", "Completed", "In Progress", "Pending", "Hold", "% Done")

    wsCalc.Range("A13").Value = "Central"
    wsCalc.Range("B13").Formula = "=COUNTIF(tbl_sites[Region],A13)"
    wsCalc.Range("C13").Formula = "=COUNTIFS(tbl_sites[Region],A13,tbl_sites[Site Status],""COMPLETED"")"
    wsCalc.Range("D13").Formula = "=COUNTIFS(tbl_sites[Region],A13,tbl_sites[Site Status],""UNDER PROGRESS"")"
    wsCalc.Range("E13").Formula = "=COUNTIFS(tbl_sites[Region],A13,tbl_sites[Site Status],""PENDING"")"
    wsCalc.Range("F13").Formula = "=COUNTIFS(tbl_sites[Region],A13,tbl_sites[Site Status],""HOLD"")"
    wsCalc.Range("G13").Formula = "=IF(B13=0,0,C13/B13)"

    wsCalc.Range("A14").Value = "West"
    wsCalc.Range("B14").Formula = "=COUNTIF(tbl_sites[Region],A14)"
    wsCalc.Range("C14").Formula = "=COUNTIFS(tbl_sites[Region],A14,tbl_sites[Site Status],""COMPLETED"")"
    wsCalc.Range("D14").Formula = "=COUNTIFS(tbl_sites[Region],A14,tbl_sites[Site Status],""UNDER PROGRESS"")"
    wsCalc.Range("E14").Formula = "=COUNTIFS(tbl_sites[Region],A14,tbl_sites[Site Status],""PENDING"")"
    wsCalc.Range("F14").Formula = "=COUNTIFS(tbl_sites[Region],A14,tbl_sites[Site Status],""HOLD"")"
    wsCalc.Range("G14").Formula = "=IF(B14=0,0,C14/B14)"

    wsCalc.Range("A15").Value = "All"
    wsCalc.Range("B15").Formula = "=COUNTA(tbl_sites[Site ID])"
    wsCalc.Range("C15").Formula = "=COUNTIF(tbl_sites[Site Status],""COMPLETED"")"
    wsCalc.Range("D15").Formula = "=COUNTIF(tbl_sites[Site Status],""UNDER PROGRESS"")"
    wsCalc.Range("E15").Formula = "=COUNTIF(tbl_sites[Site Status],""PENDING"")"
    wsCalc.Range("F15").Formula = "=COUNTIF(tbl_sites[Site Status],""HOLD"")"
    wsCalc.Range("G15").Formula = "=IF(B15=0,0,C15/B15)"

    wsCalc.Range("A20:E20").Value = Array("Stage", "Done", "% Done", "In Progress", "Pending / Hold")

    BuildStageRow wsCalc, 21, "Permits", "Permits"
    BuildStageRow wsCalc, 22, "Field Survey", "Survey"
    BuildStageRow wsCalc, 23, "Design", "Design"
    BuildStageRow wsCalc, 24, "Approvals", "Approvals"
    BuildStageRow wsCalc, 25, "Implementation", "Execution"
    BuildStageRow wsCalc, 26, "Delivery", "Delivery"

    wsCalc.Columns("A:G").AutoFit
    wsCalc.Range("G13:G15").NumberFormat = "0%"
    wsCalc.Range("C21:C26").NumberFormat = "0.0%"

    '========================
    ' 5) Link Dashboard to Calc
    '========================
    wsDash.Range("B7").Formula = "=Calc!B2"
    wsDash.Range("D7").Formula = "=Calc!B3"
    wsDash.Range("F7").Formula = "=Calc!B4"
    wsDash.Range("H7").Formula = "=Calc!B5"
    wsDash.Range("J7").Formula = "=Calc!B6"
    wsDash.Range("L7").Formula = "=Calc!B7"
    wsDash.Range("N7").Formula = "=Calc!B8"
    wsDash.Range("P7").Formula = "=Calc!B9"

    wsDash.Range("B12").Formula = "=Calc!A13"
    wsDash.Range("C12").Formula = "=Calc!B13"
    wsDash.Range("D12").Formula = "=Calc!C13"
    wsDash.Range("E12").Formula = "=Calc!D13"
    wsDash.Range("F12").Formula = "=Calc!E13"
    wsDash.Range("G12").Formula = "=Calc!F13"
    wsDash.Range("H12").Formula = "=Calc!G13"

    wsDash.Range("B13").Formula = "=Calc!A14"
    wsDash.Range("C13").Formula = "=Calc!B14"
    wsDash.Range("D13").Formula = "=Calc!C14"
    wsDash.Range("E13").Formula = "=Calc!D14"
    wsDash.Range("F13").Formula = "=Calc!E14"
    wsDash.Range("G13").Formula = "=Calc!F14"
    wsDash.Range("H13").Formula = "=Calc!G14"

    wsDash.Range("B14").Formula = "=Calc!A15"
    wsDash.Range("C14").Formula = "=Calc!B15"
    wsDash.Range("D14").Formula = "=Calc!C15"
    wsDash.Range("E14").Formula = "=Calc!D15"
    wsDash.Range("F14").Formula = "=Calc!E15"
    wsDash.Range("G14").Formula = "=Calc!F15"
    wsDash.Range("H14").Formula = "=Calc!G15"

    wsDash.Range("H12:H14").NumberFormat = "0%"

    wsDash.Range("B20").Formula = "=Calc!A21"
    wsDash.Range("C20").Formula = "=Calc!B21"
    wsDash.Range("D20").Formula = "=Calc!C21"
    wsDash.Range("E20").Formula = "=Calc!D21"
    wsDash.Range("F20").Formula = "=Calc!E21"

    wsDash.Range("B21").Formula = "=Calc!A22"
    wsDash.Range("C21").Formula = "=Calc!B22"
    wsDash.Range("D21").Formula = "=Calc!C22"
    wsDash.Range("E21").Formula = "=Calc!D22"
    wsDash.Range("F21").Formula = "=Calc!E22"

    wsDash.Range("B22").Formula = "=Calc!A23"
    wsDash.Range("C22").Formula = "=Calc!B23"
    wsDash.Range("D22").Formula = "=Calc!C23"
    wsDash.Range("E22").Formula = "=Calc!D23"
    wsDash.Range("F22").Formula = "=Calc!E23"

    wsDash.Range("B23").Formula = "=Calc!A24"
    wsDash.Range("C23").Formula = "=Calc!B24"
    wsDash.Range("D23").Formula = "=Calc!C24"
    wsDash.Range("E23").Formula = "=Calc!D24"
    wsDash.Range("F23").Formula = "=Calc!E24"

    wsDash.Range("B24").Formula = "=Calc!A25"
    wsDash.Range("C24").Formula = "=Calc!B25"
    wsDash.Range("D24").Formula = "=Calc!C25"
    wsDash.Range("E24").Formula = "=Calc!D25"
    wsDash.Range("F24").Formula = "=Calc!E25"

    wsDash.Range("B25").Formula = "=Calc!A26"
    wsDash.Range("C25").Formula = "=Calc!B26"
    wsDash.Range("D25").Formula = "=Calc!C26"
    wsDash.Range("E25").Formula = "=Calc!D26"
    wsDash.Range("F25").Formula = "=Calc!E26"

    wsDash.Range("D20:D25").NumberFormat = "0.0%"
    wsDash.Range("B42").Value = "Automated version ready: update All Sites table and refresh workbook."

    Application.CalculateFull
    Application.ScreenUpdating = True
    Application.DisplayAlerts = True

    MsgBox "Automation layer created successfully.", vbInformation

End Sub

Private Sub AddListValidation(targetRange As Range, formulaText As String)
    With targetRange.Validation
        .Delete
        .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, Operator:=xlBetween, Formula1:=formulaText
        .IgnoreBlank = True
        .InCellDropdown = True
        .InputTitle = ""
        .ErrorTitle = "Invalid value"
        .InputMessage = ""
        .ErrorMessage = "Choose a value from the list."
        .ShowInput = True
        .ShowError = True
    End With
End Sub

Private Sub BuildStageRow(ws As Worksheet, rowNo As Long, stageLabel As String, colName As String)

    ws.Cells(rowNo, 1).Value = stageLabel
    ws.Cells(rowNo, 2).Formula = "=COUNTIFS(tbl_sites[Site Status],""<>COMPLETED"",tbl_sites[" & colName & "],""COMPLETED"")"
    ws.Cells(rowNo, 4).Formula = "=COUNTIFS(tbl_sites[Site Status],""<>COMPLETED"",tbl_sites[" & colName & "],""UNDER PROGRESS"")"
    ws.Cells(rowNo, 5).Formula = "=COUNTIFS(tbl_sites[Site Status],""<>COMPLETED"",tbl_sites[" & colName & "],""PENDING"")+COUNTIFS(tbl_sites[Site Status],""<>COMPLETED"",tbl_sites[" & colName & "],""HOLD"")"
    ws.Cells(rowNo, 3).Formula = "=IF(SUM(B" & rowNo & ",D" & rowNo & ",E" & rowNo & ")=0,0,B" & rowNo & "/SUM(B" & rowNo & ",D" & rowNo & ",E" & rowNo & "))"

End Sub
