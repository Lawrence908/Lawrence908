from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

def create_book_list_pdf(filename, books):
    # Create document
    doc = SimpleDocTemplate(filename, pagesize=letter)
    styles = getSampleStyleSheet()
    content = []

    # Custom title style
    title_style = ParagraphStyle(
        'Title',
        fontSize=36,
        leading=42,
        alignment=1,  # Center alignment
        textColor=colors.black,
        fontName='Helvetica-Bold'
    )
    title2_style = ParagraphStyle(
        'Title',
        fontSize=36,
        leading=28,
        alignment=1,  # Center alignment
        textColor=colors.black,
        fontName='Helvetica-Bold'
    )
    subtitle_style = ParagraphStyle(
        'Subtitle',
        fontSize=28,
        leading=0,
        alignment=1,
        textColor=colors.darkblue,
        fontName='Helvetica-Bold'
    )
    book_title_style = ParagraphStyle(
        'BookTitle',
        fontSize=12,  # Smaller font size for mobile viewing
        leading=12,  # Compact spacing between title and author
        alignment=1,  # Center alignment
        spaceAfter=12,  # Add extra space between entries
        textColor=colors.black
    )

    # Title
    content.append(Paragraph("________ 2024 ________", title_style))
    content.append(Paragraph("Chris Lawrence's Audiobook List", subtitle_style))
    content.append(Paragraph("_____________________", title2_style))
    content.append(Spacer(1, 20))

    # Two-column book layout
    column_width = 200  # Each column's width
    books_per_column = len(books) // 2 + len(books) % 2
    left_column = books[:books_per_column]
    right_column = books[books_per_column:]

    # Table data for two columns
    table_data = []
    max_rows = max(len(left_column), len(right_column))
    for i in range(max_rows):
        left_entry = left_column[i] if i < len(left_column) else ("", "")
        right_entry = right_column[i] if i < len(right_column) else ("", "")

        left_paragraph = Paragraph(f"<b>{left_entry[0]}</b><br/><font size=10 color='grey'>{left_entry[1]}</font>", book_title_style)
        right_paragraph = Paragraph(f"<b>{right_entry[0]}</b><br/><font size=10 color='grey'>{right_entry[1]}</font>", book_title_style)

        table_data.append([left_paragraph, right_paragraph])

    # Create table
    table = Table(table_data, colWidths=[column_width, column_width])
    table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 20),
        ('RIGHTPADDING', (0, 0), (-1, -1), 20),
        ('BOX', (0, 0), (-1, -1), 3, colors.black),
    ]))

    content.append(table)

    # Build the PDF
    doc.build(content)

# Book list
data = [
    ("Who Moved My Cheese?", "Spencer Johnson"),
    ("The Splendid and the Vile", "Erik Larson"),
    ("Grit", "Angela Duckworth"),
    ("Can't Hurt Me", "David Goggins"),
    ("Sapiens", "Yuval Noah Harari"),
    ("The Obstacle Is the Way", "Ryan Holiday"),
    ("Discipline Is Destiny", "Ryan Holiday"),
    ("The Origin of Species", "Charles Darwin"),
    ("Horizon", "Barry Lopez"),
    ("The Power of Now", "Eckhart Tolle"),
    ("Atomic Habits", "James Clear"),
    ("How to Change Your Mind", "Michael Pollan"),
    ("Stillness Is the Key", "Ryan Holiday"),
    ("Ego Is the Enemy", "Ryan Holiday"),
    ("Extreme Ownership", "Jocko Willink & Leif Babin"),
    ("Algorithms to Live By", "Brian Christian & Tom Griffiths"),
    ("The Creative Act", "Rick Rubin"),
    ("Homo Deus", "Yuval Noah Harari"),
    ("Courage Is Calling", "Ryan Holiday"),
    ("Right Thing, Right Now", "Ryan Holiday")
]

# Generate PDF
create_book_list_pdf("My_Book_List_2024.pdf", data)
