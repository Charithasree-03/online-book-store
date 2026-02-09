package com.example.OnlineBookStore.service;

import com.example.OnlineBookStore.entity.Book;
import com.example.OnlineBookStore.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Book findById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    public List<Book> searchBooks(String keyword) {
        return bookRepository.findByAuthorContainingIgnoreCaseOrTitleContainingIgnoreCase(keyword, keyword);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    public Book updateBook(Long id, Book updatedBook) {
        Book existingBook = findById(id);
        if (existingBook != null) {
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthor(updatedBook.getAuthor());
            existingBook.setPrice(updatedBook.getPrice());
            existingBook.setIsbn(updatedBook.getIsbn());
            existingBook.setStock(updatedBook.getStock());
            existingBook.setCategory(updatedBook.getCategory());
            existingBook.setImageUrl(updatedBook.getImageUrl());
            existingBook.setPages(updatedBook.getPages());
            existingBook.setDescription(updatedBook.getDescription());
            existingBook.setPublisher(updatedBook.getPublisher());
            existingBook.setLanguage(updatedBook.getLanguage());
            existingBook.setPublicationDate(updatedBook.getPublicationDate());
            existingBook.setRating(updatedBook.getRating());
            existingBook.setRatingCount(updatedBook.getRatingCount());
            existingBook.setAvailable(updatedBook.getAvailable());
            existingBook.setSoldCount(updatedBook.getSoldCount());
            // valid fields only
            
            return bookRepository.save(existingBook);
        }
        throw new RuntimeException("Book not found with id: " + id);
    }
}